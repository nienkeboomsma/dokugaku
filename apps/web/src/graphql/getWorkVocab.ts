import { gql } from '@apollo/client'
import { type GQL_WorkVocabQuery } from '@repo/graphql-types'

import { getClient } from './ApolloClient'
import { type Word } from '../types/Word'

export const getWorkVocab = async (workId: string) => {
  const WORK_VOCAB = gql`
    query WorkVocab($input: WordListInput) {
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
      minFrequency: 3,
      workIdInWhichIgnored: workId,
      workIds: [workId],
    },
  }

  try {
    const { data } = await getClient().query<GQL_WorkVocabQuery>({
      query: WORK_VOCAB,
      variables,
    })

    if (!data) return []

    const wordList: Word[] = data.wordList
      .map((word) => {
        return {
          ...word,
          ignored: word.ignored ?? undefined,
          componentNumber: word.componentNumber ?? undefined,
        }
      })
      .sort((wordA, wordB) => wordB.frequency - wordA.frequency)

    return wordList
  } catch {
    return []
  }
}
