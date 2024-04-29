import { gql } from '@apollo/client'
import { type GQL_ExcludedOrKnownWordsQuery } from '@repo/graphql-types'

import { getClient } from './ApolloClient'
import { type Word } from '../types/Word'

export const getExcludedOrKnownWords = async (type: 'excluded' | 'known') => {
  const EXCLUDED_OR_KNOWN_WORDS = gql`
    query ExcludedOrKnownWords($input: WordListInput) {
      wordList(input: $input) {
        id
        info
      }
    }
  `

  const variables = {
    input: {
      distinctOnly: true,
      excluded: type === 'excluded' ? true : undefined,
      known: type === 'known' ? true : undefined,
    },
  }

  try {
    const { data } = await getClient().query<GQL_ExcludedOrKnownWordsQuery>({
      query: EXCLUDED_OR_KNOWN_WORDS,
      variables,
    })

    if (!data) return []

    const wordList: Word[] = data.wordList

    return wordList
  } catch {
    return []
  }
}
