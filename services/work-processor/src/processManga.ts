import { type Express, type Response } from 'express'
import path from 'node:path'

import { mokuroExtensions, volumePath } from './utils/constants.js'
import { convertImagesToWebP, renameFilesSequentially } from './utils/utils.js'
import {
  createCoverImage,
  getTimeEstimate,
  runIchiranOnEachPage,
  runMokuro,
} from './utils/manga-utils.js'
import { insertIntoDatabase } from './db/insertIntoDatabase.js'

export async function processManga(req: Express.Request, res: Response) {
  const timeTaken = 'Time to process the entire request'
  console.time(timeTaken)

  const {
    folderName,
    body: { series, volumeNumber, title, authors, userId },
  } = req
  console.table({ folderName, userId, series, volumeNumber, title, authors })

  const fullPath = path.join(volumePath, folderName)

  const filesAreMokurod = req.body.mokuro === 'true'

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
    id: folderName,
    estimatedDurationInMin: estimatedDuration / 1000 / 60,
    estimatedFinishTime: timeWhenFinished,
  })

  if (!filesAreMokurod) await runMokuro(folderName)
  await runIchiranOnEachPage(fullPath)
  await createCoverImage(fullPath)
  await convertImagesToWebP(fullPath)

  await insertIntoDatabase(
    {
      authors: req.body.authors,
      seriesTitle: req.body.series,
      workId: folderName,
      workMaxProgress: numberOfImages.toString(),
      workTitle: req.body.title,
      workType: 'manga',
      workVolumeNumber: req.body.volumeNumber,
    },
    req.body.userId,
    fullPath
  )

  console.timeEnd(timeTaken)
}
