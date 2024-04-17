import { Request, Response } from 'express'
import path from 'node:path'
import { novelTextExtensions, volumePath } from './utils/constants.js'
import { convertImagesToWebP, renameFilesSequentially } from './utils/utils.js'
import {
  divideTextStringIntoChunks,
  getTextStringFromHtml,
  getTimeEstimate,
  runIchiranOnEachChunk,
  saveHtmlAsJson,
  stripAndCombineFiles,
} from './utils/novel-utils.js'
import { insertIntoDatabase } from './db/insertIntoDatabase.js'

export async function processNovel(req: Request, res: Response) {
  const timeTaken = 'Time to process the entire request'
  console.time(timeTaken)

  const folderName = req.folderName
  const fullPath = path.join(volumePath, folderName)

  renameFilesSequentially(fullPath, novelTextExtensions, 'part')
  stripAndCombineFiles(fullPath, req.body.title)
  const numberOfParagraphs = await saveHtmlAsJson(fullPath)
  const text = getTextStringFromHtml(fullPath)
  const { chunks, totalChars } = divideTextStringIntoChunks(text, 2500)

  const { estimatedDuration, timeWhenFinished } = getTimeEstimate(totalChars)
  res.status(200).json({
    id: folderName,
    estimatedDurationInMin: estimatedDuration / 1000 / 60,
    estimatedFinishTime: timeWhenFinished,
  })

  await runIchiranOnEachChunk(chunks, fullPath)
  await convertImagesToWebP(fullPath)
  await insertIntoDatabase(
    {
      seriesTitle: req.body.series,
      workId: folderName,
      workType: 'novel',
      workTitle: req.body.title,
      workVolumeNumber: req.body.volumeNumber,
      workMaxProgress: numberOfParagraphs.toString(),
      authors: req.body.authors,
    },
    req.body.userId,
    fullPath
  )

  console.timeEnd(timeTaken)
}
