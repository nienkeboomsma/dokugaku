// id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
//   word_id integer NOT NULL REFERENCES word,
//   work_id uuid NOT NULL REFERENCES work,
//   page_number smallint NULL,
//   sentence_number integer NOT NULL,
//   entry_number smallint NOT NULL,
//   component_number smallint NULL,
//   UNIQUE (word_id, work_id, page_number, sentence_number, entry_number, component_number)

import pg from 'pg'
import fs from 'node:fs'
import path from 'node:path'
import { Word, WorkMetadata } from '../utils/types.js'

export async function updateWordWorkTable(
  client: pg.Client,
  workMetadata: WorkMetadata,
  fullPath: string
) {
  const ichiranFile = path.join(fullPath, 'ichiran.json')
  const wordsJson = fs.readFileSync(ichiranFile).toString()
  const words: Word[] = JSON.parse(wordsJson)

  type WordInfoArrays = Record<
    keyof Omit<Word, 'reading'>,
    Array<string | number | null>
  >

  const wordInfoArrays: WordInfoArrays = {
    id: [],
    pageNumber: [],
    sentenceNumber: [],
    entryNumber: [],
    componentNumber: [],
  }

  const keys = Object.keys(wordInfoArrays) as Array<keyof WordInfoArrays>

  for (const key of keys) {
    const wordInfoValues = words.map((word) => word[key] ?? null)
    wordInfoArrays[key] = wordInfoValues
  }

  const lengths = keys.map((key) => wordInfoArrays[key].length)
  const firstLength = lengths[0]
  const allSameLength = lengths.every((length) => length === firstLength)

  if (!allSameLength)
    throw new Error(
      'There was a problem processing the word info; some values are missing.'
    )

  const wordIdArray = wordInfoArrays.id
  const workIdArray = new Array(firstLength).fill(workMetadata.workId)
  const volumeNumberArray = new Array(firstLength).fill(
    workMetadata.workVolumeNumber
  )
  const pageNumberArray = wordInfoArrays.pageNumber
  const sentenceNumberArray = wordInfoArrays.sentenceNumber
  const entryNumberArray = wordInfoArrays.entryNumber
  const componentNumberArray = wordInfoArrays.componentNumber

  const queryText =
    'INSERT INTO word_work(word_id, work_id, volume_number, page_number, sentence_number, entry_number, component_number) ' +
    'SELECT * FROM UNNEST ($1::int[], $2::uuid[], $3::smallint[], $4::smallint[], $5::smallint[], $6::smallint[], $7::smallint[]) ' +
    'AS data (word_id, work_id, volume_number, page_number, sentence_number, entry_number, component_number) ' +
    // Ichiran parses some words into place names, which do not appear in the
    // 'word' table. It is safe to skip these words; they are mostly spurious.
    'WHERE EXISTS (SELECT 1 FROM word WHERE word.id = data.word_id);'

  const queryValueArrays = [
    wordIdArray,
    workIdArray,
    volumeNumberArray,
    pageNumberArray,
    sentenceNumberArray,
    entryNumberArray,
    componentNumberArray,
  ]

  await client.query({
    text: queryText,
    values: queryValueArrays,
  })

  console.log('Updated word_work table')
}
