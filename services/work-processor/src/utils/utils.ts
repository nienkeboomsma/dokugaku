import axios from 'axios'
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

import { type IchiranData } from './types.js'
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

export async function runIchiran(
  string: string,
  endpoint: 'idsOnly'
): Promise<number[]>
export async function runIchiran(
  string: string,
  endpoint: 'processedSegmentation'
): Promise<IchiranData>
export async function runIchiran(
  string: string,
  endpoint: 'idsOnly' | 'processedSegmentation'
): Promise<number[] | IchiranData> {
  const url = `http://ichiran:${process.env.ICHIRAN_PORT}/${endpoint}`

  const res = await axios.post(
    url,
    { string },
    // TODO: use Redis to track Ichiran progress instead
    { timeout: 1000 * 60 * 60 }
  )

  return res.data
}

export function concatToJson(
  outputFilePath: string,
  parsedJson: {},
  isFirstPass: boolean,
  isLastPass: boolean
) {
  const stringifiedJson = JSON.stringify(parsedJson).slice(1, -1)

  if (isFirstPass) {
    fs.writeFileSync(outputFilePath, '[', 'utf8')
  }

  if (stringifiedJson !== '') {
    fs.appendFileSync(outputFilePath, `${stringifiedJson},`)
  }

  if (isLastPass) {
    const json = fs.readFileSync(outputFilePath).toString()
    const jsonWithoutTrailingComma = json.slice(0, -1)
    fs.writeFileSync(outputFilePath, `${jsonWithoutTrailingComma}]`, 'utf8')
  }
}

export async function convertImagesToWebP(fullPath: string) {
  console.log('Converting images to WebP')

  const images = getAllFilesByExtension(fullPath, mokuroExtensions)

  const timeTaken = `Time to convert ${images.length} images to WebP`
  console.time(timeTaken)

  for (const inputFile of images) {
    const inputPath = path.join(fullPath, inputFile)

    const inputFileName = path.parse(inputFile).name
    const outputFile = path.format({ name: inputFileName, ext: '.webp' })
    const outputPath = path.join(fullPath, outputFile)

    if (inputFileName === 'cover') {
      await sharp(inputPath)
        .resize({ width: 320 })
        .toFormat('webp')
        .toFile(outputPath)
    } else {
      await sharp(inputPath).toFormat('webp').toFile(outputPath)
    }

    fs.rmSync(inputPath)
  }

  console.timeEnd(timeTaken)
}
