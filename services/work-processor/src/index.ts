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
import sql from './db/sql.js'

async function main() {
  const app: Express = express()

  app.use(cors())
  app.use(express.json())

  // TODO: look into image optimisation for cover images (both novel and manga);
  //       for a start, save a smaller copy of img0001.webp as cover.webp

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

  const port = process.env.WORK_PROCESSOR_PORT
  app.listen(port)
  console.log(`Listening on port ${port}`)
}

const test = await sql`SELECT * FROM work;`
console.log(test)
main()
