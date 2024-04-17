import { Express, Request, Response, NextFunction } from 'express'
import path from 'node:path'
import { mokuroExtensions } from './utils/constants.js'
import { isNumber } from './utils/types.js'

// TODO: look into Zod for validation
export function validateMetadata(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authors, series, title, userId, volumeNumber } = req.body

  if (!authors) {
    return res.status(500).send({
      error: 'Make sure to provide one or more authors.',
    })
  }

  if (!Array.isArray(authors)) {
    req.body.authors = [authors]
  }

  if (series && !volumeNumber) {
    return res
      .status(500)
      .send({ error: 'Make sure to provide a volume number.' })
  }

  if (!series && volumeNumber) {
    return res
      .status(500)
      .send({ error: 'Make sure to provide a series title.' })
  }

  if (!isNumber(volumeNumber)) {
    req.body.volumeNumber = Number(req.body.volumeNumber)
  }

  if (!title) {
    return res.status(500).send({ error: 'Make sure to provide a title.' })
  }

  if (!userId) {
    return res.status(500).send({ error: 'Make sure to provide a user ID.' })
  }

  next()
}

export function mokurodFilesAreValid(files: Express.Multer.File[]) {
  const images = files.filter((file) => {
    const fileExtension = path.extname(file.originalname)
    return mokuroExtensions.includes(fileExtension)
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
  req: Request,
  res: Response,
  next: NextFunction
) {
  const filesAreMokurod = req.body.mokuro === 'on'

  if (!req.files) {
    return res.status(500).send({ error: 'Make sure to include the images.' })
  }

  if (!Array.isArray(req.files)) {
    return res
      .status(500)
      .send({ error: 'Make sure there is only one "files" input in the form.' })
  }

  if (filesAreMokurod && !mokurodFilesAreValid(req.files)) {
    return res.status(500).send({
      error: 'Make sure there is a corresponding JSON file for each image.',
    })
  }

  next()
}

export function validateNovelFiles(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.files) {
    return res
      .status(500)
      .send({ error: 'Make sure to attach a cover and text file(s).' })
  }

  if (Array.isArray(req.files)) {
    return res
      .status(500)
      .send(
        'Make sure there is a "cover" input and a "files" input in the form.'
      )
  }

  if (!req.files.cover || !req.files.files) {
    return res
      .status(500)
      .send({ error: 'Make sure to attach both a cover and text file(s).' })
  }

  next()
}
