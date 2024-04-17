import { Request, Response } from 'express'
import path from 'node:path'

import { mokuroExtensions, volumePath } from './utils/constants.js'
import { convertImagesToWebP, renameFilesSequentially } from './utils/utils.js'
import {
  getTimeEstimate,
  runIchiranOnEachPage,
  runMokuro,
} from './utils/manga-utils.js'
import { insertIntoDatabase } from './db/insertIntoDatabase.js'

export async function processManga(req: Request, res: Response) {
  const timeTaken = 'Time to process the entire request'
  console.time(timeTaken)

  const folderName = req.folderName
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
  await convertImagesToWebP(fullPath)
  await insertIntoDatabase(
    {
      seriesTitle: req.body.series,
      workId: folderName,
      workType: 'manga',
      workTitle: req.body.title,
      workVolumeNumber: req.body.volumeNumber,
      workMaxProgress: numberOfImages.toString(),
      authors: req.body.authors,
    },
    req.body.userId,
    fullPath
  )

  console.timeEnd(timeTaken)
}
