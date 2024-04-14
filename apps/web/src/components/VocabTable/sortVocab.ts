import { Vocab } from '../../types/Vocab'
import { isNumber } from '../../types/utility'

const sortBy = (
  vocabA: Vocab,
  vocabB: Vocab,
  property:
    | 'volumeNumber'
    | 'pageNumber'
    | 'sentenceNumber'
    | 'entryNumber'
    | 'componentNumber'
) => {
  const valueA = vocabA[property]
  const valueB = vocabB[property]

  if (!isNumber(valueA) || !isNumber(valueB)) return 0

  return valueA - valueB
}

export default function sortVocab(
  vocabA: Vocab,
  vocabB: Vocab,
  sortOrder: 'frequency' | 'firstOccurrence'
) {
  if (
    sortOrder === 'frequency' &&
    isNumber(vocabA.frequency) &&
    isNumber(vocabB.frequency)
  ) {
    return vocabB.frequency - vocabA.frequency
  }

  const sortingCriteria = [
    'volumeNumber',
    'pageNumber',
    'sentenceNumber',
    'entryNumber',
    'componentNumber',
  ] as const

  if (sortOrder === 'firstOccurrence') {
    for (const criterion of sortingCriteria) {
      if (
        isNumber(vocabA[criterion]) &&
        isNumber(vocabB[criterion]) &&
        vocabA[criterion] !== vocabB[criterion]
      ) {
        return sortBy(vocabA, vocabB, criterion)
      }
    }
  }

  return 0
}
