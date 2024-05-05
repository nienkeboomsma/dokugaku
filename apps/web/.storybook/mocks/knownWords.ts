import { KNOWN_WORDS } from '../../src/graphql/queries/vocabTableQueries'
import { mockVocab } from '../fixtures/vocab'

export const knownWords = {
  request: {
    query: KNOWN_WORDS,
  },
  variableMatcher: () => true,
  result: {
    data: {
      knownWords: mockVocab.map((vocab) => {
        return {
          __typename: 'KnownWord',
          id: vocab.id,
          info: vocab.info,
        }
      }),
    },
  },
}
