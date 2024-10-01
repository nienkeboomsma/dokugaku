import cors from 'cors'
import express, { type Express } from 'express'

import { processMangaFiles, processNovelFiles } from './multer.js'
import {
  validateMangaFiles,
  validateWorkMetadata,
  validateNovelFiles,
  validateKnownWords,
} from './middleware.js'
import { processManga } from './processManga.js'
import { processNovel } from './processNovel.js'
import { processKnownWords } from './processKnownWords.js'
import { errorHandler } from './errorHandler.js'

const app: Express = express()

app.use(cors())
app.use(express.json({ limit: '50mb' }))

app.post(
  '/processManga',
  processMangaFiles,
  validateMangaFiles,
  validateWorkMetadata,
  processManga
)

app.post(
  '/processNovel',
  processNovelFiles,
  validateNovelFiles,
  validateWorkMetadata,
  processNovel
)

app.post('/knownWords', validateKnownWords, processKnownWords)

app.use(errorHandler)

const port = Number(process.env.WORK_PROCESSOR_PORT)
app.listen(port)
console.log(`Listening on port ${port}`)
