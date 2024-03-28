import multer from 'multer'
import { randomUUID } from 'node:crypto'
import { execSync } from 'node:child_process'
import path from 'node:path'
import { mangaExtensions, novelTextExtensions } from './utils/constants.js'
import { RequestHandler } from 'express'

const storage = multer.diskStorage({
  destination: (req, _, cb) => {
    const folderName = req.folderName ?? randomUUID()
    const fullPath = path.join('/dokugaku/', folderName)

    if (!req.folderName) execSync(`mkdir ${fullPath}`)
    req.folderName = folderName
    cb(null, fullPath)
  },
  filename: (_, file, cb) => {
    if (file.fieldname === 'cover') {
      const extension = path.extname(file.originalname)
      return cb(null, `cover${extension}`)
    }
    cb(null, file.originalname)
  },
})

export const processMangaFiles: RequestHandler = multer({
  storage: storage,
  fileFilter: (_, file, cb) => {
    const fileName = file.originalname
    const extension = path.extname(fileName).toLowerCase()
    const allowedExtensions = mangaExtensions

    if (allowedExtensions.includes(extension)) return cb(null, true)

    console.log(`File ${file.originalname} is not allowed`)
    return cb(null, false)
  },
}).array('files')

export const processNovelFiles: RequestHandler = multer({
  storage: storage,
  fileFilter: (_, file, cb) => {
    const fileName = file.originalname
    const extension = path.extname(fileName).toLowerCase()

    if (file.fieldname === 'cover') {
      const allowedExtensions = ['.png', '.jpg', '.jpeg']
      if (allowedExtensions.includes(extension)) return cb(null, true)
    }

    if (file.fieldname === 'files') {
      const allowedExtensions = novelTextExtensions
      if (allowedExtensions.includes(extension)) return cb(null, true)
    }

    console.log(`File ${file.originalname} is not allowed`)
    return cb(null, false)
  },
}).fields([{ name: 'cover', maxCount: 1 }, { name: 'files' }])
