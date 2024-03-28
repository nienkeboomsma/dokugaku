import { Request, Response } from 'express'
import path from 'node:path'
import { novelTextExtensions, volumePath } from './utils/constants.js'
import { renameFilesSequentially } from './utils/utils.js'
import {
  divideTextStringIntoChunks,
  getTextStringFromHtml,
  getTimeEstimate,
  runIchiranOnEachChunk,
  saveHtmlAsJson,
  stripAndCombineFiles,
} from './utils/novel-utils.js'

export async function processNovel(req: Request, res: Response) {
  const timeTaken = 'Time to process the entire request'
  console.time(timeTaken)

  const folderName = req.folderName
  const fullPath = path.join(volumePath, folderName)

  // TODO: validate req.body contents
  console.table({
    series: req.body.series,
    volume: req.body.volume,
    title: req.body.title,
    author: req.body.author,
  })

  renameFilesSequentially(fullPath, novelTextExtensions, 'part')
  stripAndCombineFiles(fullPath, req.body.jp_title)
  await saveHtmlAsJson(fullPath)
  const text = getTextStringFromHtml(fullPath)
  const { chunks, totalChars } = divideTextStringIntoChunks(text, 2500)

  const { estimatedDuration, timeWhenFinished } = getTimeEstimate(totalChars)
  res.status(200).json({
    estimatedDurationInMin: estimatedDuration / 1000 / 60,
    estimatedFinishTime: timeWhenFinished,
  })

  await runIchiranOnEachChunk(chunks, fullPath)

  console.timeEnd(timeTaken)

  // TODO: if all intermediate steps are successful, upload data to Postgres
}
