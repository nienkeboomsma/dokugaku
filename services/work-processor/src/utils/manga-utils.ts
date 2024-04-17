import fs from 'node:fs'
import path from 'node:path'
import axios from 'axios'
import { MokuroData } from './types.js'
import { concatToJson, getAllFilesByExtension, runIchiran } from './utils.js'
import {
  ichiranTimePerPage,
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

export async function runMokuro(folderName: string) {
  const timeTaken = 'Time to run Mokuro'
  console.time(timeTaken)

  console.log(`Starting Mokuro`)

  await axios.post(
    `http://mokuro:${process.env.MOKURO_PORT}/mokuro`,
    { folderName },
    // TODO: use Redis to track Mokuro progress instead
    { timeout: 1000 * 60 * 60 }
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

export async function runIchiranOnEachPage(fullPath: string) {
  const pages = getAllFilesByExtension(fullPath, ['.json'])

  const timeTaken = `Time to run Ichiran on ${pages.length} pages`
  console.time(timeTaken)

  for (const [index, page] of pages.entries()) {
    const filePath = path.join(fullPath, page)
    const mokuroOutput = fs.readFileSync(filePath).toString()
    const mokuroData = JSON.parse(mokuroOutput)
    const string = getTextFromMokuroData(mokuroData)

    console.log(`Running Ichiran on page ${index + 1} of ${pages.length}`)
    const words = await runIchiran(string)

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
