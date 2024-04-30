import { gql } from '@apollo/client'
import {
  GQL_WantToReadWorksQuery,
  type GQL_RecommendedVocabQuery,
} from '@repo/graphql-types'

import { getClient } from './ApolloClient'
import { type Word } from '../types/Word'

export const getRecommendedVocab = async () => {
  const WANT_TO_READ_WORKS = gql`
    query WantToReadWorks($input: WorkListInput) {
      workList(input: $input) {
        id
      }
    }
  `

  const wantToReadVariables = {
    input: {
      status: 'want_to_read',
    },
  }

  const { data } = await getClient().query<GQL_WantToReadWorksQuery>({
    query: WANT_TO_READ_WORKS,
    variables: wantToReadVariables,
  })

  const workIds = data.workList.map((work) => work.id)

  const RECOMMENDED_VOCAB = gql`
    query RecommendedVocab($input: WordListInput) {
      wordList(input: $input) {
        id
        info
        frequency
      }
    }
  `

  const recommendedVocabVariables = {
    input: {
      excluded: false,
      known: false,
      distinctOnly: true,
      workIds,
    },
  }

  try {
    const { data } = await getClient().query<GQL_RecommendedVocabQuery>({
      query: RECOMMENDED_VOCAB,
      variables: recommendedVocabVariables,
    })

    if (!data) return []

    const wordList: Word[] = data.wordList.sort(
      (wordA, wordB) => wordB.frequency - wordA.frequency
    )

    return wordList
  } catch {
    return []
  }
}
