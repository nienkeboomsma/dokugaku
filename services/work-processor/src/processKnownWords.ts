import type { Response } from 'express'
import type { KnownWordsRequest } from './utils/types.js'
import { getTimeEstimate } from './utils/novel-utils.js'
import {
  divideWordsStringIntoChunks,
  runIchiranOnEachChunk,
} from './utils/known-words-utils.js'
import { insertKnownWordsIntoDatabase } from './db/words/insertKnownWordsIntoDatabase.js'

export async function processKnownWords(req: KnownWordsRequest, res: Response) {
  const timeTaken = 'Time to process the entire request'
  console.time(timeTaken)

  // TODO: userId should be set in an auth header
  const {
    body: { userId, words },
  } = req

  const { chunks, totalChars } = divideWordsStringIntoChunks(words, 2000)
  const { estimatedDuration, timeWhenFinished } = getTimeEstimate(totalChars)

  res.status(200).json({
    estimatedDurationInMin: estimatedDuration / 1000 / 60,
    estimatedFinishTime: timeWhenFinished,
  })

  try {
    const wordIds = await runIchiranOnEachChunk(chunks)
    await insertKnownWordsIntoDatabase(wordIds, userId)

    console.timeEnd(timeTaken)
  } catch (err) {
    console.log('An error occurred: ', err)
    console.timeEnd(timeTaken)
    process.exit(1)
  }
}
