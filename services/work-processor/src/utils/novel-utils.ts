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
import cliProgress from 'cli-progress'

import { concatToJson, getAllFilesByExtension, runIchiran } from './utils.js'
import { novelTextExtensions } from './constants.js'
import type { NovelTextJsonNode, NovelTextJsonTopLevel } from './types.js'

function editImageUrl(
  url: boolean | number | string | null | undefined | Array<string | number>
) {
  if (typeof url !== 'string') return null

  const extension = path.extname(url)
  const filename = path.basename(url, extension)

  return `${filename}.webp`
}

function markdownToHtml(markdown: string) {
  const strippedMdast = fromMarkdown(markdown)
  const strippedHast = toHast(strippedMdast, {
    allowDangerousHtml: false,
    handlers: {
      // @ts-expect-error
      image(state, node) {
        const properties = {
          src: editImageUrl(node.url),
          title: node.title || null,
          alt: node.alt || null,
        }

        const result = {
          type: 'element',
          tagName: 'img',
          properties,
          children: [],
        }
        // @ts-expect-error
        state.patch(node, result)
        // @ts-expect-error
        return state.applyData(node, result)
      },
    },
  })
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
        const props = node.properties
        const result = {
          type: 'image',
          url: editImageUrl(props.src),
          title: props.title || null,
          alt: props.alt || '',
        }
        // @ts-expect-error
        state.patch(node, result)
        return result
      },
      // @ts-expect-error
      ruby(state, node) {
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
  novelTextJson: NovelTextJsonTopLevel,
  fullPath: string
) {
  const content = novelTextJson.content

  let paragraphNumber = 0
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
      } else if (
        'type' in childNode &&
        childNode.type !== 'rt' &&
        childNode.content
      ) {
        processChildNode(childNode.content)
      }
    }

    paragraphNode.content?.forEach((childNode: string | NovelTextJsonNode) =>
      processChildNode(childNode)
    )

    const paragraph = paragraphStrings.join('')
    paragraphs.push(paragraph)
  }

  content.forEach((paragraphNode) => {
    // Blockquotes can contain multiple paragraphs, which should be processed
    // separately.
    if (paragraphNode.type === 'blockquote' && paragraphNode.content) {
      paragraphNode.content.forEach((subParagraphNode) => {
        if (typeof subParagraphNode !== 'string') {
          paragraphNumber++
          subParagraphNode.paragraphNumber = paragraphNumber
          processParagraphNode(subParagraphNode)
        }
      })
    } else {
      paragraphNumber++
      paragraphNode.paragraphNumber = paragraphNumber
      processParagraphNode(paragraphNode)
    }
  })

  fs.writeFileSync(
    path.join(fullPath, 'text.json'),
    JSON.stringify(novelTextJson),
    'utf8'
  )

  return paragraphs
}

export async function runIchiranOnEachParagraph(
  paragraphs: string[],
  fullPath: string,
  title: string
) {
  const progressBar = new cliProgress.SingleBar(
    {
      format: `${title} ・ {bar} ・ {percentage}% ・ {value}/{total} ・ {eta_formatted} to go`,
      noTTYOutput: true,
      notTTYSchedule: 60000,
    },
    cliProgress.Presets.shades_classic
  )
  progressBar.start(paragraphs.length, 0)

  try {
    for (const [index, paragraph] of paragraphs.entries()) {
      const words = await runIchiran(paragraph, 'processedSegmentation', 3)
      if (!words) throw new Error('Unable to complete segmentation')

      progressBar.update(index + 1)

      for (let word of words) {
        const paragraphNumber = index + 1
        word.pageNumber = paragraphNumber
      }

      const isFirstPass = index === 0
      const isLastPass = index === paragraphs.length - 1
      const outputPath = path.join(fullPath, 'ichiran.json')

      concatToJson(outputPath, words, isFirstPass, isLastPass)
    }
  } finally {
    progressBar.stop()
  }
}
