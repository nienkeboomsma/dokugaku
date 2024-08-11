import { FREQUENCY_LIST } from '../../src/graphql/queries/vocabTableQueries'
import { mockVocab } from '../fixtures/vocab'

export const frequencyList = {
  request: {
    query: FREQUENCY_LIST,
  },
  variableMatcher: () => true,
  result: {
    data: {
      frequencyList: mockVocab
        .map((vocab) => {
          return {
            __typename: 'FrequencyListWord',
            id: vocab.id,
            info: vocab.info,
            frequency: vocab.frequency,
            ignored: vocab.ignored,
          }
        })
        .sort((vocabA, vocabB) => {
          if (vocabA.frequency && vocabB.frequency) {
            return vocabB.frequency - vocabA.frequency
          }
          return 0
        }),
    },
  },
}
