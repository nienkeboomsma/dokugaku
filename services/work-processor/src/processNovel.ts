import type { NextFunction, Response } from 'express'
import path from 'node:path'

import type { NovelUploadRequest } from './utils/types.js'
import { novelTextExtensions, volumePath } from './utils/constants.js'
import { convertImagesToWebP, renameFilesSequentially } from './utils/utils.js'
import {
  divideTextJsonIntoParagraphs,
  runIchiranOnEachParagraph,
  saveHtmlAsJson,
  stripAndCombineFiles,
} from './utils/novel-utils.js'
import { insertWorkIntoDatabase } from './db/work/insertWorkIntoDatabase.js'

export async function processNovel(
  req: NovelUploadRequest,
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

  renameFilesSequentially(fullPath, novelTextExtensions, 'part')
  stripAndCombineFiles(fullPath, req.body.title)
  const novelTextJson = await saveHtmlAsJson(fullPath)

  const paragraphs = divideTextJsonIntoParagraphs(novelTextJson, fullPath)
  const numberOfParagraphs = paragraphs.length

  res.status(200).json({
    id: folderName,
    success: true,
  })

  try {
    await runIchiranOnEachParagraph(paragraphs, fullPath, title)
    await convertImagesToWebP(fullPath, title)
    await insertWorkIntoDatabase(
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
  } catch (err) {
    next(err)
  }
}
