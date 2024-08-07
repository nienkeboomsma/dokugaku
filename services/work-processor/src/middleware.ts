import type { Express, Response, NextFunction } from 'express'
import path from 'node:path'

import { imageExtensions } from './utils/constants.js'
import {
  type MangaUploadRequest,
  type NovelUploadRequest,
  type UploadRequest,
  isNumber,
  KnownWordsRequest,
} from './utils/types.js'

// TODO: look into Zod for validation
export function validateKnownWords(
  req: KnownWordsRequest,
  res: Response,
  next: NextFunction
) {
  // TODO: userId should be in header
  const { userId, words } = req.body

  if (!userId) {
    throw new Error('Make sure to provide a user ID')
  }

  if (!words) {
    throw new Error('Make sure to provide a list of known words')
  }

  next()
}

export function validateWorkMetadata(
  req: UploadRequest,
  res: Response,
  next: NextFunction
) {
  // TODO: userId should be in header
  const { authors, series, title, userId, volumeNumber } = req.body

  if (!authors) {
    throw new Error('Make sure to provide one or more authors')
  }

  if (!Array.isArray(authors)) {
    req.body.authors = [authors]
  }

  if (!series) {
    req.body.series = undefined
  }

  if (!volumeNumber) {
    req.body.volumeNumber = undefined
  }

  if (series && !volumeNumber) {
    throw new Error('Make sure to provide a volume number')
  }

  if (!series && volumeNumber) {
    throw new Error('Make sure to provide a series title')
  }

  if (volumeNumber && !isNumber(volumeNumber)) {
    req.body.volumeNumber = Number(volumeNumber)
  }

  if (!title) {
    throw new Error('Make sure to provide a title')
  }

  if (!userId) {
    throw new Error('Make sure to provide a user ID')
  }

  // TODO: Check if a work with the same title or series/number already exists

  next()
}

export function mokurodFilesAreValid(files: Express.Multer.File[]) {
  const images = files.filter((file) => {
    const fileExtension = path.extname(file.originalname)
    return imageExtensions.includes(fileExtension)
  })

  const jsons = files.filter((file) => {
    const fileExtension = path.extname(file.originalname)
    return fileExtension === '.json'
  })

  if (images.length !== jsons.length) return false

  const correspondenceValues = images.map((image) => {
    const name = path.parse(image.originalname).name
    const correspondingJson = `${name}.json`
    const hasCorrespondingJson = jsons.some(
      (json) => json.originalname === correspondingJson
    )
    return hasCorrespondingJson
  })

  return correspondenceValues.every((value) => value)
}

export function validateMangaFiles(
  req: MangaUploadRequest,
  res: Response,
  next: NextFunction
) {
  const filesAreMokurod = req.body.mokuro === 'true'

  if (!req.files) {
    throw new Error('Make sure to include the images')
  }

  if (!Array.isArray(req.files)) {
    throw new Error('Make sure there is only one "files" input in the form')
  }

  if (filesAreMokurod && !mokurodFilesAreValid(req.files)) {
    throw new Error(
      'Make sure there is a corresponding JSON file for each image'
    )
  }

  next()
}

export function validateNovelFiles(
  req: NovelUploadRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.files) {
    throw new Error('Make sure to attach a cover and text file(s)')
  }

  if (Array.isArray(req.files)) {
    throw new Error(
      'Make sure there is a "cover" input and a "files" input in the form'
    )
  }

  if (!req.files.cover || !req.files.files) {
    throw new Error('Make sure to attach both a cover and text file(s)')
  }

  next()
}
