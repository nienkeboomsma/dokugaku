import { EXCLUDED_WORDS } from '../../src/graphql/queries/vocabTableQueries'
import { mockVocab } from '../fixtures/vocab'

export const excludedWords = {
  request: {
    query: EXCLUDED_WORDS,
  },
  variableMatcher: () => true,
  result: {
    data: {
      excludedWords: mockVocab.map((vocab) => {
        return {
          __typename: 'ExcludedWord',
          id: vocab.id,
          info: vocab.info,
          jlpt: vocab.jlpt,
        }
      }),
    },
  },
}
