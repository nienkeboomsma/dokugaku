import fs from 'node:fs'
import path from 'node:path'
import axios from 'axios'
import cliProgress from 'cli-progress'

import { type MokuroData } from './types.js'
import { concatToJson, getAllFilesByExtension, runIchiran } from './utils.js'
import { imageExtensions } from './constants.js'

export async function runMokuro(folderName: string, title: string) {
  console.log(`${title} ・ Starting Mokuro`)

  await axios.post(
    `http://mokuro:${process.env.MOKURO_PORT}/mokuro`,
    { folderName },
    // TODO: use Redis to track Mokuro progress instead
    { timeout: 1000 * 60 * 240 }
  )
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

  const progressBar = new cliProgress.SingleBar(
    {
      format: `${title} ・ {bar} ・ {percentage}% ・ {value}/{total} ・ {eta_formatted} to go`,
      noTTYOutput: true,
      notTTYSchedule: 60000,
    },
    cliProgress.Presets.shades_classic
  )
  progressBar.start(pages.length, 0)

  try {
    for (const [index, page] of pages.entries()) {
      const filePath = path.join(fullPath, page)
      const mokuroOutput = fs.readFileSync(filePath).toString()
      const mokuroData = JSON.parse(mokuroOutput)
      const string = getTextFromMokuroData(mokuroData)

      const words = await runIchiran(string, 'processedSegmentation', 3)
      if (!words) throw new Error('Unable to complete segmentation')

      progressBar.update(index + 1)

      for (let word of words) {
        const pageNumber = Number(path.parse(page).name.slice(-4))
        word.pageNumber = pageNumber
      }

      const isFirstPass = index === 0
      const isLastPass = index === pages.length - 1
      const outputPath = path.join(fullPath, 'ichiran.json')

      concatToJson(outputPath, words, isFirstPass, isLastPass)
    }
  } finally {
    progressBar.stop()
  }
}

export function createCoverImage(fullPath: string, title: string) {
  const images = getAllFilesByExtension(fullPath, imageExtensions)
  const [firstPage] = images.sort()

  if (!firstPage) {
    return console.log(`${title} ・ Unable to generate a cover image`)
  }

  const firstPagePath = path.join(fullPath, firstPage)
  const coverPath = path.join(fullPath, `cover${path.extname(firstPage)}`)

  fs.copyFileSync(firstPagePath, coverPath)
}
