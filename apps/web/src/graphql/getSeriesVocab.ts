import { gql } from '@apollo/client'
import { type GQL_SeriesVocabQuery } from '@repo/graphql-types'

import { getClient } from './ApolloClient'
import { type Word } from '../types/Word'

export const getSeriesVocab = async (seriesId: string, workIds: string[]) => {
  const SERIES_VOCAB = gql`
    query SeriesVocab($input: WordListInput) {
      wordList(input: $input) {
        id
        info
        frequency
        ignored
        pageNumber
        sentenceNumber
        entryNumber
        componentNumber
      }
    }
  `

  const variables = {
    input: {
      distinctOnly: true,
      excluded: false,
      known: false,
      minFrequency: 3 * workIds.length,
      seriesIdInWhichIgnored: seriesId,
      workIds: workIds,
    },
  }

  try {
    const { data } = await getClient().query<GQL_SeriesVocabQuery>({
      query: SERIES_VOCAB,
      variables,
    })

    if (!data) return []

    const wordList: Word[] = data.wordList.map((word) => {
      return {
        ...word,
        ignored: word.ignored ?? undefined,
        componentNumber: word.componentNumber ?? undefined,
      }
    })

    return wordList
  } catch {
    return []
  }
}
