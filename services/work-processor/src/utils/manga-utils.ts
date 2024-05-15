import fs from 'node:fs'
import path from 'node:path'
import axios from 'axios'

import { type MokuroData } from './types.js'
import { concatToJson, getAllFilesByExtension, runIchiran } from './utils.js'
import {
  ichiranTimePerPage,
  mokuroExtensions,
  mokuroInitTime,
  mokuroTimePerPage,
  webpConversionPerImage,
} from './constants.js'

export function getTimeEstimate(
  alreadyMokurod: boolean,
  numberOfImages: number
) {
  const estimatedDuration = alreadyMokurod
    ? numberOfImages * (ichiranTimePerPage + webpConversionPerImage)
    : mokuroInitTime +
      numberOfImages *
        (mokuroTimePerPage + ichiranTimePerPage + webpConversionPerImage)

  const timeWhenFinished = new Date(Date.now() + estimatedDuration)

  return { estimatedDuration, timeWhenFinished }
}

export async function runMokuro(folderName: string, title: string) {
  const timeTaken = `${title} ・ Time to run Mokuro`
  console.time(timeTaken)

  console.log(`${title} ・ Starting Mokuro`)

  await axios.post(
    `http://mokuro:${process.env.MOKURO_PORT}/mokuro`,
    { folderName },
    // TODO: use Redis to track Mokuro progress instead
    { timeout: 1000 * 60 * 120 }
  )

  console.timeEnd(timeTaken)
}

function getTextFromMokuroData(data: MokuroData) {
  const blocks = data.blocks
  const linesString = blocks.reduce((string, block) => {
    const line = block.lines.join(' ')
    return string + line + '。'
  }, '')
  return linesString
}

export async function runIchiranOnEachPage(fullPath: string, title: string) {
  const pages = getAllFilesByExtension(fullPath, ['.json'])

  const timeTaken = `${title} ・ Time to run Ichiran on ${pages.length} pages`
  console.time(timeTaken)

  for (const [index, page] of pages.entries()) {
    const filePath = path.join(fullPath, page)
    const mokuroOutput = fs.readFileSync(filePath).toString()
    const mokuroData = JSON.parse(mokuroOutput)
    const string = getTextFromMokuroData(mokuroData)

    console.log(
      `${title} ・ Running Ichiran on page ${index + 1} of ${pages.length}`
    )
    const words = await runIchiran(string, 'processedSegmentation')

    for (let word of words) {
      const pageNumber = Number(path.parse(page).name.slice(-4))
      word.pageNumber = pageNumber
    }

    const isFirstPass = index === 0
    const isLastPass = index === pages.length - 1
    const outputPath = path.join(fullPath, 'ichiran.json')

    concatToJson(outputPath, words, isFirstPass, isLastPass)
  }

  console.timeEnd(timeTaken)
}

export function createCoverImage(fullPath: string, title: string) {
  const images = getAllFilesByExtension(fullPath, mokuroExtensions)
  const [firstPage] = images.sort()

  if (!firstPage) {
    return console.log(`${title} ・ Unable to generate a cover image`)
  }

  const firstPagePath = path.join(fullPath, firstPage)
  const coverPath = path.join(fullPath, `cover${path.extname(firstPage)}`)

  fs.copyFileSync(firstPagePath, coverPath)
}
