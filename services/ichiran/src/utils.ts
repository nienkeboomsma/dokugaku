import { Client } from 'pg'
import { execSync } from 'child_process'
import {
  Entry,
  isSentence,
  isUnconjugated,
  Segmentation,
  WordInfo,
} from './types'

export async function getConjugations() {
  const config = {
    user: 'postgres',
    password: process.env.POSTGRES_PASSWORD,
    database: 'ichiran-db',
    host: 'ichiran-db',
    port: 5432,
  }

  const client = new Client(config)

  await client.connect()

  const query = 'SELECT seq, "from" FROM conjugation'

  type Row = { seq: number; from: number }

  try {
    const { rows } = await client.query<Row>(query)
    const keyValuePairs: [number, number][] = rows.map(({ seq, from }) => [
      seq,
      from,
    ])
    client.end()
    return new Map(keyValuePairs)
  } catch (err) {
    client.end()
    throw Error('Unable to retrieve conjugation list')
  }
}

export function getSegmentation(string: string): Segmentation {
  try {
    const data = execSync(`ichiran-cli -f -- "${string}"`).toString()
    return JSON.parse(data)
  } catch (error) {
    throw Error('Unable to retrieve segmentation')
  }
}

function getWordId(wordInfo: WordInfo, conjugations: Map<number, number>) {
  if (isUnconjugated(wordInfo)) return wordInfo.seq
  return conjugations.get(wordInfo.seq) ?? 0
}

function getWordIdFromEntry(entry: Entry, conjugations: Map<number, number>) {
  const wordInfo = entry[1]
  return getWordId(wordInfo, conjugations)
}

function filterSpuriousWordIds(id: number) {
  return id !== 0
}

export async function getWordIdList(
  segmentation: Segmentation,
  conjugations: Map<number, number>
) {
  const sentences = segmentation.filter(isSentence)

  const wordIdList = sentences.reduce<number[]>((totals, sentence) => {
    const entries = sentence[0][0]
    const wordIds = entries
      .map((entry) => getWordIdFromEntry(entry, conjugations))
      .filter((id) => filterSpuriousWordIds(id))
    return totals.concat(wordIds)
  }, [])
  return wordIdList
}
