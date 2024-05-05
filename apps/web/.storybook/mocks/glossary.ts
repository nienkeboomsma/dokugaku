import { GLOSSARY } from '../../src/graphql/queries/vocabTableQueries'
import { mockVocab } from '../fixtures/vocab'

export const glossary = {
  request: {
    query: GLOSSARY,
  },
  variableMatcher: () => true,
  result: {
    data: {
      glossary: mockVocab.map((vocab) => {
        return {
          __typename: 'GlossaryWord',
          id: vocab.id,
          info: vocab.info,
          ignored: vocab.ignored,
          frequency: vocab.frequency,
          pageNumber: vocab.pageNumber,
          sentenceNumber: vocab.sentenceNumber,
          entryNumber: vocab.entryNumber,
          componentNumber: vocab.componentNumber,
        }
      }),
    },
  },
}
