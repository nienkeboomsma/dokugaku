import type { NextFunction, Response } from 'express'
import fs from 'node:fs'
import path from 'node:path'

import type { MangaUploadRequest } from './utils/types.js'
import { mokuroExtensions, volumePath } from './utils/constants.js'
import { convertImagesToWebP, renameFilesSequentially } from './utils/utils.js'
import {
  createCoverImage,
  getTimeEstimate,
  runIchiranOnEachPage,
  runMokuro,
} from './utils/manga-utils.js'
import { insertWorkIntoDatabase } from './db/work/insertWorkIntoDatabase.js'

export async function processManga(
  req: MangaUploadRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.folderName) {
    throw new Error('Something went wrong with Multer storage')
  }

  // TODO: userId should be set in an auth header
  const {
    folderName,
    body: { authors, series, title, userId, volumeNumber },
  } = req

  const timeTaken = `${title} ・ Time to process the entire request`
  console.time(timeTaken)

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

  try {
    if (!filesAreMokurod) await runMokuro(folderName, title)
    await runIchiranOnEachPage(fullPath, title)
    createCoverImage(fullPath, title)
    await convertImagesToWebP(fullPath, title)

    await insertWorkIntoDatabase(
      {
        authors: authors,
        seriesTitle: series,
        workId: folderName,
        workMaxProgress: numberOfImages.toString(),
        workTitle: title,
        workType: 'manga',
        workVolumeNumber: volumeNumber,
      },
      userId,
      fullPath
    )

    console.timeEnd(timeTaken)
  } catch (err) {
    console.log(`${title} ・ Removing the directory ${fullPath}`)
    fs.rmSync(fullPath, { recursive: true, force: true })
    console.timeEnd(timeTaken)
    next(err)
  }
}
