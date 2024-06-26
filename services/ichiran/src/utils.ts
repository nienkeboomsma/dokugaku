import { Client } from 'pg'
import { execSync } from 'child_process'
import {
  hasAlternatives,
  hasVia,
  isCompoundWord,
  isConjugatedWord,
  isNonCompoundWord,
  isSentence,
  NonCompoundWord,
  ProcessedWord,
  Segmentation,
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

  const { rows } = await client.query<Row>(query)
  const keyValuePairs: [number, number][] = rows.map(({ seq, from }) => [
    seq,
    from,
  ])
  client.end()
  return new Map(keyValuePairs)
}

export function getSegmentation(string: string): Segmentation {
  const strippedString = string.replaceAll(/"/g, '')

  console.log(
    `Segmenting ${strippedString.length > 500 ? strippedString.slice(0, 500) + '... etc.' : strippedString}`
  )
  const data = execSync(`ichiran-cli -f -- "${strippedString}"`).toString()
  return JSON.parse(data)
}

function getIdFromNonCompoundWord(
  nonCompoundWord: NonCompoundWord,
  conjugations: Map<number, number>
) {
  if (isConjugatedWord(nonCompoundWord)) {
    return conjugations.get(nonCompoundWord.seq) ?? 0
  }
  return nonCompoundWord.seq
}

function stripFuriganaFromReading(reading: string) {
  return reading.replace(/ 【.*】/g, '')
}

function getReadingFromNonCompoundWord(nonCompoundWord: NonCompoundWord) {
  if (isConjugatedWord(nonCompoundWord)) {
    const conjInfo = nonCompoundWord.conj[0]

    if (hasVia(conjInfo)) {
      return stripFuriganaFromReading(conjInfo.via[0].reading)
    }

    return stripFuriganaFromReading(conjInfo.reading)
  }

  return stripFuriganaFromReading(nonCompoundWord.reading)
}

export async function getWordListFromSegmentation(segmentation: Segmentation) {
  const conjugations = await getConjugations()
  const sentences = segmentation.filter(isSentence)
  const wordList = sentences.reduce<Array<ProcessedWord>>(
    (wordList, sentence, sentenceIndex) => {
      const entries = sentence[0][0]

      const words = entries.flatMap((entry, entryIndex) => {
        const entryContent = entry[1]

        // if ichiran isn't sure which word it is, it is skipped to prevent spurious data
        if (hasAlternatives(entryContent)) return []

        if (isCompoundWord(entryContent)) {
          return entryContent.components.map(
            (componentWord, componentIndex) => {
              return {
                id: getIdFromNonCompoundWord(componentWord, conjugations),
                reading: getReadingFromNonCompoundWord(componentWord),
                sentenceNumber: sentenceIndex + 1,
                entryNumber: entryIndex + 1,
                componentNumber: componentIndex + 1,
              }
            }
          )
        }

        if (isNonCompoundWord(entryContent)) {
          return {
            id: getIdFromNonCompoundWord(entryContent, conjugations),
            reading: getReadingFromNonCompoundWord(entryContent),
            sentenceNumber: sentenceIndex + 1,
            entryNumber: entryIndex + 1,
          }
        }

        // exclude exclamations and other meaningless 'words' that have no id
        return []
      })
      return wordList.concat(words)
    },
    []
  )
  return wordList
}
