import type { Response } from 'express'
import type { KnownWordsRequest } from './utils/types.js'
import {
  divideWordsStringIntoChunks,
  runIchiranOnEachChunk,
} from './utils/known-words-utils.js'
import { insertKnownWordsIntoDatabase } from './db/words/insertKnownWordsIntoDatabase.js'

export async function processKnownWords(req: KnownWordsRequest, res: Response) {
  console.log('Known words ・ Processing known words')

  // TODO: userId should be set in an auth header
  const {
    body: { userId, words },
  } = req

  const { chunks } = divideWordsStringIntoChunks(words, 2000)

  res.status(200).json({
    success: true,
  })

  try {
    const wordIds = await runIchiranOnEachChunk(chunks)
    await insertKnownWordsIntoDatabase(wordIds, userId)
  } catch (err) {
    console.log(
      `Known words ・ 🛑 Unable to process known words: ${err instanceof Error ? err.message : err} 🛑`
    )
  }
}
