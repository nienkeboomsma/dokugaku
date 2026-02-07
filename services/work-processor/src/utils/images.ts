import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

import { imageExtensions } from './constants.js'
import { getAllFilesByExtension } from './utils.js'

// failOnError deals with issue #1859
// https://github.com/lovell/sharp/issues/1859
const SHARP_OPTS = { failOnError: false }

type FileData = {
  path: string
  name: string
  ext: string
}

export async function fixMismatchingImageHeights(fullPath: string) {
  const images = getAllFilesByExtension(fullPath, imageExtensions)
  const sortedImages = images.sort()

  for (const [index, file] of sortedImages.entries()) {
    const fileData = toFileData(fullPath, file)

    // We only want to resize left pages with a corresponding right page
    const isLeftPage = index > 1 && index % 2 === 0

    if (!isLeftPage) continue

    const rightPageFile = sortedImages[index - 1]!
    const rightPageFileData = toFileData(fullPath, rightPageFile)

    await matchImageHeights(fileData, rightPageFileData)
  }
}

export async function createCoverImage(fullPath: string, title: string) {
  const images = getAllFilesByExtension(fullPath, imageExtensions)
  const [firstPage] = images.sort()

  if (!firstPage) {
    return console.log(`${title} ・ Unable to generate a cover image`)
  }

  const firstPagePath = path.join(fullPath, firstPage)
  const coverPath = path.join(fullPath, `cover${path.extname(firstPage)}`)

  fs.copyFileSync(firstPagePath, coverPath)
}

export async function convertImagesToWebP(fullPath: string) {
  const nonWebpImageExtensions = imageExtensions.filter(
    (ext) => ext !== '.webp' && ext !== '.WEBP'
  )
  const images = getAllFilesByExtension(fullPath, nonWebpImageExtensions)

  for (const inputFile of images) {
    const inputPath = path.join(fullPath, inputFile)

    const inputFileName = path.parse(inputFile).name
    const outputFile = path.format({ name: inputFileName, ext: '.webp' })
    const outputPath = path.join(fullPath, outputFile)

    if (inputFileName === 'cover') {
      await sharp(inputPath, SHARP_OPTS)
        .resize({ width: 320 })
        .webp()
        .toFile(outputPath)
    } else {
      await sharp(inputPath).webp().toFile(outputPath)
    }

    fs.rmSync(inputPath)
  }
}

async function matchImageHeights(leftPage: FileData, rightPage: FileData) {
  const [leftPageMetadata, rightPageMetadata] = await Promise.all([
    sharp(leftPage.path, SHARP_OPTS).metadata(),
    sharp(rightPage.path, SHARP_OPTS).metadata(),
  ])

  const leftPageHeight = leftPageMetadata.height ?? 0
  const rightPageHeight = rightPageMetadata.height ?? 0

  if (leftPageHeight > rightPageHeight) {
    await resize(leftPage, rightPageHeight)
    return
  }

  if (rightPageHeight > leftPageHeight) {
    await resize(rightPage, leftPageHeight)
  }
}

async function resize(file: FileData, height: number) {
  const tempPath = path.join(
    path.dirname(file.path),
    `${file.name}_tmp${file.ext}`
  )

  await sharp(file.path, SHARP_OPTS).resize({ height }).toFile(tempPath)

  fs.renameSync(tempPath, file.path)
}

function toFileData(fullPath: string, file: string): FileData {
  const parsedPath = path.parse(file)

  return {
    path: path.join(fullPath, file),
    name: parsedPath.name,
    ext: parsedPath.ext,
  }
}
