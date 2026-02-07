import type { NextFunction, Response } from 'express'
import path from 'node:path'

import type { MangaUploadRequest } from './utils/types.js'
import { imageExtensions, volumePath } from './utils/constants.js'
import {
  convertImagesToWebP,
  createCoverImage,
  fixMismatchingImageHeights,
} from './utils/images.js'
import { runIchiranOnEachPage, runMokuro } from './utils/manga-utils.js'
import { renameFilesSequentially } from './utils/utils.js'
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

  const fullPath = path.join(volumePath, folderName)

  const filesAreMokurod = req.body.mokuro === 'true'

  const numberOfImages = renameFilesSequentially(
    fullPath,
    imageExtensions,
    'img'
  )
  if (filesAreMokurod) renameFilesSequentially(fullPath, ['.json'], 'img')

  res.status(200).json({
    id: folderName,
    success: true,
  })

  try {
    await fixMismatchingImageHeights(fullPath)
    if (!filesAreMokurod) await runMokuro(folderName, title)
    await runIchiranOnEachPage(fullPath, title)
    await createCoverImage(fullPath, title)
    await convertImagesToWebP(fullPath)

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
  } catch (err) {
    next(err)
  }
}
