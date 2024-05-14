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

  console.table({
    totalChars,
    numberOfChunks,
    numberOfWords: words.length,
    wordsPerChunk,
  })

  const chunks = Array.from({ length: numberOfChunks }, (_, index) => {
    const firstIndex = index * wordsPerChunk
    const lastIndex = (index + 1) * wordsPerChunk
    return words.slice(firstIndex, lastIndex).join('。')
  })

  return { chunks, totalChars }
}

export async function runIchiranOnEachChunk(chunks: string[]) {
  const timeTaken = `Time to run Ichiran on ${chunks.length} chunks`
  console.time(timeTaken)

  const allWordIds: Set<number> = new Set()

  for (const [index, chunk] of chunks.entries()) {
    console.log(`Running Ichiran on chunk ${index + 1} of ${chunks.length}`)
    const wordIds = await runIchiran(chunk, 'idsOnly')

    for (const wordId of wordIds) {
      allWordIds.add(wordId)
    }
  }

  console.timeEnd(timeTaken)
  return allWordIds
}
