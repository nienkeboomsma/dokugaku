import { type Express, type Response } from 'express'
import fs from 'node:fs'
import path from 'node:path'

import { novelTextExtensions, volumePath } from './utils/constants.js'
import { convertImagesToWebP, renameFilesSequentially } from './utils/utils.js'
import {
  divideTextJsonIntoParagraphs,
  getTimeEstimate,
  runIchiranOnEachParagraph,
  saveHtmlAsJson,
  stripAndCombineFiles,
} from './utils/novel-utils.js'
import { insertIntoDatabase } from './db/insertIntoDatabase.js'

export async function processNovel(req: Express.Request, res: Response) {
  const timeTaken = 'Time to process the entire request'
  console.time(timeTaken)

  const {
    folderName,
    body: { series, volumeNumber, title, authors, userId },
  } = req

  console.table({ folderName, userId, series, volumeNumber, title, authors })

  const fullPath = path.join(volumePath, folderName)

  renameFilesSequentially(fullPath, novelTextExtensions, 'part')
  stripAndCombineFiles(fullPath, req.body.title)
  const novelTextJson = await saveHtmlAsJson(fullPath)

  const { paragraphs, totalChars } = divideTextJsonIntoParagraphs(novelTextJson)
  const numberOfParagraphs = paragraphs.length

  const { estimatedDuration, timeWhenFinished } = getTimeEstimate(totalChars)
  res.status(200).json({
    id: folderName,
    estimatedDurationInMin: estimatedDuration / 1000 / 60,
    estimatedFinishTime: timeWhenFinished,
  })

  try {
    await runIchiranOnEachParagraph(paragraphs, fullPath)
    await convertImagesToWebP(fullPath)
    await insertIntoDatabase(
      {
        authors: authors,
        seriesTitle: series,
        workId: folderName,
        workMaxProgress: numberOfParagraphs.toString(),
        workTitle: title,
        workType: 'novel',
        workVolumeNumber: volumeNumber,
      },
      userId,
      fullPath
    )

    console.timeEnd(timeTaken)
  } catch (err) {
    fs.rmSync(fullPath, { recursive: true, force: true })
    console.log('An error occurred: ', err)
    process.exit(1)
  }
}
