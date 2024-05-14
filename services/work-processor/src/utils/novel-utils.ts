import fs from 'node:fs'
import path from 'node:path'
import { JSDOM } from 'jsdom'
import DOMPurify from 'dompurify'
import { fromHtml } from 'hast-util-from-html'
import { toMdast } from 'hast-util-to-mdast'
import { toMarkdown } from 'mdast-util-to-markdown'
import { fromMarkdown } from 'mdast-util-from-markdown'
import { toHast } from 'mdast-util-to-hast'
import { toHtml } from 'hast-util-to-html'
// @ts-expect-error
import { HTMLToJSON } from 'html-to-json-parser'

import { concatToJson, getAllFilesByExtension, runIchiran } from './utils.js'
import { ichiranTimePer100Char, novelTextExtensions } from './constants.js'
import type { NovelTextJsonNode, NovelTextJsonTopLevel } from './types.js'

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

  const jsonObject: NovelTextJsonTopLevel = JSON.parse(jsonString)
  return jsonObject
}

export function divideTextJsonIntoParagraphs(
  novelTextJson: NovelTextJsonTopLevel
) {
  const content = novelTextJson.content

  let totalChars = 0
  let paragraphs: string[] = []

  const processParagraphNode = (paragraphNode: NovelTextJsonNode) => {
    const paragraphStrings: string[] = []

    const processChildNode = (
      childNode: NovelTextJsonNode | string | Array<NovelTextJsonNode | string>
    ) => {
      if (typeof childNode === 'string') {
        paragraphStrings.push(childNode)
      } else if (Array.isArray(childNode)) {
        childNode.forEach((childNode) => processChildNode(childNode))
      } else if ('type' in childNode && childNode.type !== 'rt') {
        processChildNode(childNode.content)
      }
    }

    paragraphNode.content.forEach((childNode: string | NovelTextJsonNode) =>
      processChildNode(childNode)
    )

    const paragraph = paragraphStrings.join('')
    paragraphs.push(paragraph)
    totalChars += paragraph.length
  }

  content.forEach((paragraphNode) => processParagraphNode(paragraphNode))

  return { paragraphs, totalChars }
}

export function getTimeEstimate(totalChars: number) {
  const estimatedDuration = (totalChars / 100) * ichiranTimePer100Char
  const timeWhenFinished = new Date(Date.now() + estimatedDuration)

  return { estimatedDuration, timeWhenFinished }
}

export async function runIchiranOnEachParagraph(
  paragraphs: string[],
  fullPath: string
) {
  const timeTaken = `Time to run Ichiran on ${paragraphs.length} paragraphs`
  console.time(timeTaken)

  for (const [index, paragraph] of paragraphs.entries()) {
    console.log(
      `Running Ichiran on paragraph ${index + 1} of ${paragraphs.length}`
    )
    const words = await runIchiran(paragraph)

    for (let word of words) {
      const paragraphNumber = index + 1
      word.pageNumber = paragraphNumber
    }

    const isFirstPass = index === 0
    const isLastPass = index === paragraphs.length - 1
    const outputPath = path.join(fullPath, 'ichiran.json')

    concatToJson(outputPath, words, isFirstPass, isLastPass)
  }
  console.timeEnd(timeTaken)
}
