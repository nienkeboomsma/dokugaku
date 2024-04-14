import { Vocab } from '../../types/Vocab'
import { normalise } from '../../util/normaliseString'
import { isNumber } from '../../types/utility'
import { VocabTableType } from './VocabTable'

export default function filterVocab(
  vocab: Vocab,
  type: VocabTableType,
  debouncedSearchValue: string,
  minFrequency: string | number
) {
  if (type === 'frequencyList' && vocab.ignored === true) {
    return false
  }

  if (type === 'excludedFromWork' && vocab.ignored === false) {
    return false
  }

  if (
    debouncedSearchValue !== '' &&
    !vocab.info.kanji.some((kanji) =>
      normalise(kanji).includes(normalise(debouncedSearchValue))
    ) &&
    !vocab.info.kana.some((kana) =>
      normalise(kana).includes(normalise(debouncedSearchValue))
    ) &&
    !vocab.info.meaning.some((meaning) =>
      meaning.some((synonym) =>
        normalise(synonym).includes(normalise(debouncedSearchValue))
      )
    )
  ) {
    return false
  }

  if (
    isNumber(vocab.frequency) &&
    isNumber(minFrequency) &&
    vocab.frequency < minFrequency
  ) {
    return false
  }

  return true
}
