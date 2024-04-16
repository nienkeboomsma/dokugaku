import { JSDOM } from 'jsdom'
import DOMPurify from 'dompurify'
import { fromHtml } from 'hast-util-from-html'
import { toMdast } from 'hast-util-to-mdast'
import { toMarkdown } from 'mdast-util-to-markdown'
import { fromMarkdown } from 'mdast-util-from-markdown'
import { toHast } from 'mdast-util-to-hast'
import { toHtml } from 'hast-util-to-html'
import { concatToJson, getAllFilesByExtension, runIchiran } from './utils.js'
// @ts-expect-error
import { HTMLToJSON } from 'html-to-json-parser'
import path from 'node:path'
import fs from 'node:fs'
import { ichiranTimePer100Char, novelTextExtensions } from './constants.js'
import { NovelTextJson } from './types.js'

function markdownToHtml(markdown: string) {
  const strippedMdast = fromMarkdown(markdown)
  const strippedHast = toHast(strippedMdast, { allowDangerousHtml: false })
  return toHtml(strippedHast, { allowDangerousHtml: false })
}

function plaintextToHtml(text: string) {
  const withExtraLinebreaks = text.replaceAll(/(?<!\n)\n(?!\n)/g, '\n\n')
  return markdownToHtml(withExtraLinebreaks)
}

function sanitiseHtml(html: string) {
  const window = new JSDOM('').window
  const purify = DOMPurify(window)
  return purify.sanitize(html)
}

function stripIrrelevantHtml(cleanHtml: string) {
  const originalHast = fromHtml(cleanHtml, { fragment: true })
  const originalMdast = toMdast(originalHast, {
    handlers: {
      // @ts-expect-error
      img(state, node) {
        /** @type {Html} */
        const result = { type: 'html', value: '' }
        // @ts-expect-error
        state.patch(node, result)
        return result
      },
      // @ts-expect-error
      ruby(state, node) {
        /** @type {Html} */
        const result = { type: 'html', value: toHtml(node) }
        // @ts-expect-error
        state.patch(node, result)
        return result
      },
    },
  })
  const markdown = toMarkdown(originalMdast)
  const strippedMdast = fromMarkdown(markdown)
  const strippedHast = toHast(strippedMdast, { allowDangerousHtml: true })
  return toHtml(strippedHast, { allowDangerousHtml: true })
}

function getStrippedHtml(fileContent: string, extension: string) {
  if (extension === '.html') {
    const cleanFileContent = sanitiseHtml(fileContent)
    return stripIrrelevantHtml(cleanFileContent)
  }

  if (extension === '.md') {
    return markdownToHtml(fileContent)
  }

  return plaintextToHtml(fileContent)
}

function concatToHtml(
  outputFilePath: string,
  strippedHtml: string,
  workTitle: string,
  isFirstPass: boolean,
  isLastPass: boolean
) {
  if (isFirstPass) {
    fs.writeFileSync(
      outputFilePath,
      `<html>\n<h1>${workTitle}</h1>\n${strippedHtml}`,
      'utf8'
    )
  }

  if (!isFirstPass) {
    fs.appendFileSync(outputFilePath, `\n${strippedHtml}`)
  }

  if (isLastPass) {
    fs.appendFileSync(outputFilePath, `\n</html>`)
  }
}

export function stripAndCombineFiles(fullPath: string, workTitle: string) {
  const files = getAllFilesByExtension(fullPath, novelTextExtensions)

  for (const [index, file] of files.entries()) {
    const filePath = path.join(fullPath, file)
    const extension = path.extname(file)

    const fileContent = fs.readFileSync(filePath).toString()
    const strippedHtml = getStrippedHtml(fileContent, extension)

    const isFirstPass = index === 0
    const isLastPass = index === files.length - 1
    const outputPath = path.join(fullPath, 'index.html')

    concatToHtml(outputPath, strippedHtml, workTitle, isFirstPass, isLastPass)
  }
  return
}

export async function saveHtmlAsJson(fullPath: string) {
  const filePath = path.join(fullPath, 'index.html')
  const html = fs.readFileSync(filePath).toString()
  const singleLine = html.replaceAll('\n', '')
  const jsonString = await HTMLToJSON(singleLine, true)
  fs.writeFileSync(path.join(fullPath, 'text.json'), jsonString, 'utf8')

  const jsonObject: NovelTextJson = JSON.parse(jsonString)

  return jsonObject.content.length
}

export function getTextStringFromHtml(fullPath: string) {
  const filePath = path.join(fullPath, 'index.html')
  const html = fs.readFileSync(filePath).toString()
  return html
    .replaceAll('\n', '')
    .replaceAll(/<rt>.*?<\/rt>/g, '')
    .replaceAll(/<[!-/a-zA-Z0-9]*?>/g, '')
}

export function divideTextStringIntoChunks(
  text: string,
  charsPerChunk: number
) {
  const strippedText = text.replaceAll(/\s/g, '').replaceAll('、', '')
  const totalChars = strippedText.length
  const numberOfChunks = Math.ceil(totalChars / charsPerChunk)
  const textSentences = text.split('。')
  const sentencesPerChunk = Math.ceil(textSentences.length / numberOfChunks)

  console.table({
    totalChars,
    numberOfChunks,
    numberOfSentences: textSentences.length,
    sentencesPerChunk,
  })

  const chunks = Array.from({ length: numberOfChunks }, (_, index) => {
    const firstIndex = index * sentencesPerChunk
    const lastIndex = (index + 1) * sentencesPerChunk
    return textSentences.slice(firstIndex, lastIndex).join('。')
  })

  return { chunks, totalChars }
}

export function getTimeEstimate(totalChars: number) {
  const estimatedDuration = (totalChars / 100) * ichiranTimePer100Char
  const timeWhenFinished = new Date(Date.now() + estimatedDuration)

  return { estimatedDuration, timeWhenFinished }
}

export async function runIchiranOnEachChunk(
  chunks: string[],
  fullPath: string
) {
  const timeTaken = `Time to run Ichiran on ${chunks.length} chunks`
  console.time(timeTaken)

  for (const [index, chunk] of chunks.entries()) {
    console.log(`Running Ichiran on chunk ${index + 1} of ${chunks.length}`)
    const words = await runIchiran(chunk)

    for (let word of words) {
      const chunkNumber = index + 1
      word.pageNumber = chunkNumber
    }

    const isFirstPass = index === 0
    const isLastPass = index === chunks.length - 1
    const outputPath = path.join(fullPath, 'ichiran.json')

    concatToJson(outputPath, words, isFirstPass, isLastPass)
  }
  console.timeEnd(timeTaken)
}
