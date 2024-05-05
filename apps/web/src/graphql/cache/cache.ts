import { offsetLimitPagination } from '@apollo/client/utilities'

export const cache = {
  typePolicies: {
    Query: {
      fields: {
        excludedWords: offsetLimitPagination(['input', ['searchString']]),
        frequencyList: offsetLimitPagination([
          'input',
          ['searchString', 'seriesId', 'workId'],
        ]),
        glossary: offsetLimitPagination(['input', ['searchString', 'workId']]),
        knownWords: offsetLimitPagination(['input', ['searchString']]),
        recommendedWords: offsetLimitPagination(['input', ['searchString']]),
      },
    },
    // The 'id' property is not a unique identifier, as each distinct word
    // can occur more than once within a glossary.
    GlossaryWord: {
      keyFields: [
        'volumeNumber',
        'pageNumber',
        'sentenceNumber',
        'entryNumber',
        'componentNumber',
      ],
    },
  },
}
