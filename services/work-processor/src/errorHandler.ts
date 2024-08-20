import type { NextFunction, Response } from 'express'
import path from 'node:path'
import fs from 'node:fs'

import { UploadRequest } from './utils/types.js'
import { volumePath } from './utils/constants.js'

export function errorHandler(
  err: Error,
  req: UploadRequest,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) {
  const { title } = req.body
  const { folderName } = req

  console.error(`${title} ・ 🛑 Error: ${err.message} 🛑`)

  if (folderName) {
    const fullPath = path.join(volumePath, folderName)
    console.error(`${title} ・ 🛑 Removing the directory ${fullPath} 🛑`)
    fs.rmSync(fullPath, { recursive: true, force: true })
  }

  if (!res.headersSent) {
    return res.status(500).send({ error: err.message })
  }
}
