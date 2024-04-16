import fs from 'node:fs'
import path from 'node:path'
import axios from 'axios'
import sharp from 'sharp'

import { IchiranData } from './types.js'
import { mokuroExtensions } from './constants.js'

export function getAllFilesByExtension(fullPath: string, extensions: string[]) {
  const allFiles = fs.readdirSync(fullPath)
  return allFiles.filter((file) => {
    const fileExtension = path.extname(file).toLowerCase()
    return extensions.includes(fileExtension)
  })
}

export function renameFilesSequentially(
  fullPath: string,
  extensions: string[],
  prefix: string
) {
  const files = getAllFilesByExtension(fullPath, extensions)
  const sortedFiles = files.sort()

  sortedFiles.forEach((file, index) => {
    const fileExtension = path.extname(file)
    const paddedIndex = (index + 1).toString().padStart(4, '0')
    const newFilename = `${prefix}${paddedIndex}${fileExtension}`

    const oldPath = path.join(fullPath, file)
    const newPath = path.join(fullPath, newFilename)

    fs.renameSync(oldPath, newPath)
  })

  return sortedFiles.length
}

export async function runIchiran(string: string) {
  const res = await axios.post(
    `http://ichiran:${process.env.ICHIRAN_PORT}/processedSegmentation`,
    { string },
    // TODO: use Redis to track Ichiran progress instead
    { timeout: 1000 * 60 * 60 }
  )

  return res.data as Promise<IchiranData>
}

export function concatToJson(
  outputFilePath: string,
  parsedJson: {},
  isFirstPass: boolean,
  isLastPass: boolean
) {
  const stringifiedJson = JSON.stringify(parsedJson).slice(1, -1)

  if (isFirstPass) {
    fs.writeFileSync(outputFilePath, `[${stringifiedJson}`, 'utf8')
  }

  if (!isFirstPass) {
    fs.appendFileSync(outputFilePath, `,${stringifiedJson}`)
  }

  if (isLastPass) {
    fs.appendFileSync(outputFilePath, `]`)
  }
}

export async function convertImagesToWebP(fullPath: string) {
  console.log('Converting images to WebP')

  const images = getAllFilesByExtension(fullPath, mokuroExtensions)

  for (const inputFile of images) {
    const inputPath = path.join(fullPath, inputFile)

    const inputFileName = path.parse(inputFile).name
    const outputFile = path.format({ name: inputFileName, ext: '.webp' })
    const outputPath = path.join(fullPath, outputFile)

    await sharp(inputPath).toFormat('webp').toFile(outputPath)
    fs.rmSync(inputPath)
  }
}
