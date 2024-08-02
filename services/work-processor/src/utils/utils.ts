import axios from 'axios'
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

import { type IchiranData } from './types.js'
import { imageExtensions } from './constants.js'
import { divideWordsStringIntoChunks } from './known-words-utils.js'

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

async function keepTrying(callback: () => Promise<any>, maxTries?: number) {
  let count = 0

  while (count++ < (maxTries ?? 1)) {
    try {
      return await callback()
    } catch (err) {
      if (count === maxTries) throw err
    }
  }
}

export async function runIchiran(
  string: string,
  endpoint: 'idsOnly',
  maxTries?: number
): Promise<number[] | undefined>
export async function runIchiran(
  string: string,
  endpoint: 'processedSegmentation',
  maxTries?: number
): Promise<IchiranData | undefined>
export async function runIchiran(
  string: string,
  endpoint: 'idsOnly' | 'processedSegmentation',
  maxTries?: number
): Promise<number[] | IchiranData | undefined> {
  const MAX_STRING_LENGTH = 2500
  const url = `http://ichiran:${process.env.ICHIRAN_PORT}/${endpoint}`

  const getIchiranData = async (string: string) => {
    const res = await axios.post(
      url,
      { string },
      // TODO: use Redis to track Ichiran progress instead
      { timeout: 1000 * 60 * 60 }
    )

    return res.data
  }

  if (string.length < MAX_STRING_LENGTH) {
    return keepTrying(() => getIchiranData(string), maxTries)
  }

  const { chunks } = divideWordsStringIntoChunks(string, MAX_STRING_LENGTH)
  const totals = []

  for (const chunk of chunks) {
    const ichiranData = await keepTrying(() => getIchiranData(chunk), maxTries)
    totals.push(...ichiranData)
  }

  return totals
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

export async function convertImagesToWebP(fullPath: string, title: string) {
  const images = getAllFilesByExtension(fullPath, imageExtensions)

  for (const inputFile of images) {
    const inputPath = path.join(fullPath, inputFile)

    const inputFileName = path.parse(inputFile).name
    const outputFile = path.format({ name: inputFileName, ext: '.webp' })
    const outputPath = path.join(fullPath, outputFile)

    if (inputFileName === 'cover') {
      // failOnError deals with issue #1859
      // https://github.com/lovell/sharp/issues/1859
      await sharp(inputPath, { failOnError: false })
        .resize({ width: 320 })
        .toFormat('webp')
        .toFile(outputPath)
    } else {
      await sharp(inputPath).toFormat('webp').toFile(outputPath)
    }

    fs.rmSync(inputPath)
  }
}
