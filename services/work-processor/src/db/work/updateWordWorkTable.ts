import { type TransactionSql } from 'postgres'
import fs from 'node:fs'
import path from 'node:path'
import { type Word, type WorkMetadata } from '../../utils/types.js'

export async function updateWordWorkTable(
  sql: TransactionSql,
  workMetadata: WorkMetadata,
  fullPath: string
) {
  const ichiranFile = path.join(fullPath, 'ichiran.json')
  const wordsJson = fs.readFileSync(ichiranFile).toString()
  const words: Word[] = JSON.parse(wordsJson)

  if (!words.length)
    throw new Error('Something went wrong with loading ichiran.json')

  const columns = [
    'word_id',
    'work_id',
    'volume_number',
    'page_number',
    'sentence_number',
    'entry_number',
    'component_number',
  ]

  const wordIds = words.map((word) => word.id)
  const workIds = new Array(words.length).fill(workMetadata.workId)
  const volumeNumbers = new Array(words.length).fill(
    workMetadata.workVolumeNumber ?? null
  )
  const pageNumbers = words.map((word) => word.pageNumber)
  const sentenceNumbers = words.map((word) => word.sentenceNumber)
  const entryNumbers = words.map((word) => word.entryNumber)
  const componentNumbers = words.map((word) => word.componentNumber ?? null)

  const lengths = [
    wordIds.length,
    workIds.length,
    volumeNumbers.length,
    pageNumbers.length,
    sentenceNumbers.length,
    entryNumbers.length,
    componentNumbers.length,
  ]
  const firstLength = lengths[0]
  const allSameLength = lengths.every((length) => length === firstLength)

  if (!allSameLength) {
    throw new Error(
      'There was a problem processing the word info; some values are missing.'
    )
  }

  // Ichiran parses some words into place names, which do not appear in the
  // 'word' table. It is safe to skip these words; they are mostly spurious.
  await sql`
    INSERT INTO word_work (${sql(columns)})
    SELECT * FROM UNNEST (
      ${wordIds}::int[], 
      ${workIds}::uuid[], 
      ${volumeNumbers}::smallint[], 
      ${pageNumbers}::smallint[], 
      ${sentenceNumbers}::smallint[], 
      ${entryNumbers}::smallint[], 
      ${componentNumbers}::smallint[]
    ) AS data (${sql(columns)})
    WHERE EXISTS (
      SELECT 1 FROM word 
      WHERE word.id = data.word_id
    )
  `
}
