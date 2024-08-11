import { GLOSSARY } from '../../src/graphql/queries/vocabTableQueries'
import { mockVocab } from '../fixtures/vocab'

export const glossary = {
  request: {
    query: GLOSSARY,
  },
  variableMatcher: () => true,
  result: {
    data: {
      glossary: mockVocab
        .map((vocab) => {
          return {
            __typename: 'GlossaryWord',
            id: vocab.id,
            info: vocab.info,
            ignored: vocab.ignored,
            frequency: vocab.frequency,
            volumeNumber: vocab.volumeNumber,
            pageNumber: vocab.pageNumber,
            sentenceNumber: vocab.sentenceNumber,
            entryNumber: vocab.entryNumber,
            componentNumber: vocab.componentNumber,
          }
        })
        .sort((vocabA, vocabB) => {
          if (
            vocabA.volumeNumber &&
            vocabB.volumeNumber &&
            vocabA.volumeNumber !== vocabB.volumeNumber
          ) {
            return vocabA.volumeNumber - vocabB.volumeNumber
          }
          if (
            vocabA.pageNumber &&
            vocabB.pageNumber &&
            vocabA.pageNumber !== vocabB.pageNumber
          ) {
            return vocabA.pageNumber - vocabB.pageNumber
          }
          if (
            vocabA.sentenceNumber &&
            vocabB.sentenceNumber &&
            vocabA.sentenceNumber !== vocabB.sentenceNumber
          ) {
            return vocabA.sentenceNumber - vocabB.sentenceNumber
          }
          if (
            vocabA.entryNumber &&
            vocabB.entryNumber &&
            vocabA.entryNumber !== vocabB.entryNumber
          ) {
            return vocabA.entryNumber - vocabB.entryNumber
          }
          if (
            vocabA.componentNumber &&
            vocabB.componentNumber &&
            vocabA.componentNumber !== vocabB.componentNumber
          ) {
            return vocabA.componentNumber - vocabB.componentNumber
          }
          return 0
        }),
    },
  },
}
