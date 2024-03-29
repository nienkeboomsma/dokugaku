import { Request, Response } from 'express'
import path from 'node:path'
import { mokuroExtensions, volumePath } from './utils/constants.js'
import { convertImagesToWebP, renameFilesSequentially } from './utils/utils.js'
import {
  getTimeEstimate,
  runIchiranOnEachPage,
  runMokuro,
} from './utils/manga-utils.js'

export async function processManga(req: Request, res: Response) {
  const timeTaken = 'Time to process the entire request'
  console.time(timeTaken)

  const folderName = req.folderName
  const fullPath = path.join(volumePath, folderName)

  // TODO: validate form contents
  console.table({
    series: req.body.series,
    volume: req.body.volume,
    title: req.body.title,
    author: req.body.author,
  })

  const filesAreMokurod = req.body.mokuro === 'on'

  const numberOfImages = renameFilesSequentially(
    fullPath,
    mokuroExtensions,
    'img'
  )
  if (filesAreMokurod) renameFilesSequentially(fullPath, ['.json'], 'img')

  const { estimatedDuration, timeWhenFinished } = getTimeEstimate(
    filesAreMokurod,
    numberOfImages
  )
  res.status(200).json({
    estimatedDurationInMin: estimatedDuration / 1000 / 60,
    estimatedFinishTime: timeWhenFinished,
  })

  if (!filesAreMokurod) await runMokuro(folderName)
  await runIchiranOnEachPage(fullPath)
  await convertImagesToWebP(fullPath)

  console.timeEnd(timeTaken)

  // TODO: if all intermediate steps are successful, upload data to Postgres
}
