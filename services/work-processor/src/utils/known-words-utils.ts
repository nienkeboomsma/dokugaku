import cliProgress from 'cli-progress'

import { runIchiran } from './utils.js'

export function divideWordsStringIntoChunks(
  wordsString: string,
  charsPerChunk: number
) {
  const normalisedWordsString = wordsString.replaceAll(/\s/g, ',')
  const totalChars = normalisedWordsString.length
  const words = normalisedWordsString.split(',')
  const numberOfChunks = Math.ceil(totalChars / charsPerChunk)
  const wordsPerChunk = Math.ceil(words.length / numberOfChunks)

  const chunks = Array.from({ length: numberOfChunks }, (_, index) => {
    const firstIndex = index * wordsPerChunk
    const lastIndex = (index + 1) * wordsPerChunk
    return words.slice(firstIndex, lastIndex).join(',')
  })

  return { chunks }
}

export async function runIchiranOnEachChunk(chunks: string[]) {
  const progressBar = new cliProgress.SingleBar(
    {
      format: `Known words ・ {bar} ・ {percentage}% ・ {value}/{total} ・ {eta_formatted} to go`,
      noTTYOutput: true,
      notTTYSchedule: 10000,
    },
    cliProgress.Presets.shades_classic
  )
  progressBar.start(chunks.length, 0)

  try {
    const allWordIds: Set<number> = new Set()

    for (const [index, chunk] of chunks.entries()) {
      const wordIds = await runIchiran(chunk, 'idsOnly', 3)
      if (!wordIds)
        throw new Error('Known words ・ Unable to complete segmentation')

      progressBar.update(index + 1)

      for (const wordId of wordIds) {
        allWordIds.add(wordId)
      }
    }

    return allWordIds
  } finally {
    progressBar.stop()
  }
}
