import cors from 'cors'
import express, { type Express } from 'express'

import { processMangaFiles, processNovelFiles } from './multer.js'
import {
  validateMangaFiles,
  validateMetadata,
  validateNovelFiles,
} from './middleware.js'
import { processManga } from './processManga.js'
import { processNovel } from './processNovel.js'
import { processKnownWords } from './processKnownWords.js'
import { errorHandler } from './errorHandler.js'

const app: Express = express()

app.use(cors())
app.use(express.json())

app.post(
  '/processManga',
  processMangaFiles,
  validateMangaFiles,
  validateMetadata,
  processManga
)

app.post(
  '/processNovel',
  processNovelFiles,
  validateNovelFiles,
  validateMetadata,
  processNovel
)

app.post('/knownWords', processKnownWords)

app.use(errorHandler)

const port = process.env.WORK_PROCESSOR_PORT
app.listen(port)
console.log(`Listening on port ${port}`)
