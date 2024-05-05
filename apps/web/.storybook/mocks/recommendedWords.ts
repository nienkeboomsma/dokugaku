import { RECOMMENDED_WORDS } from '../../src/graphql/queries/vocabTableQueries'
import { mockVocab } from '../fixtures/vocab'

export const recommendedWords = {
  request: {
    query: RECOMMENDED_WORDS,
  },
  variableMatcher: () => true,
  result: {
    data: {
      recommendedWords: mockVocab.map((vocab) => {
        return {
          __typename: 'RecommendedWord',
          id: vocab.id,
          info: vocab.info,
          frequency: vocab.frequency,
        }
      }),
    },
  },
}
