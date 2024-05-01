import { type Word } from '../../types/Word'
import { normalise } from '../../util/normaliseString'
import { isNumber } from '../../types/utility'
import { VocabTableType } from './VocabTable'

export default function filterVocab({
  searchValue,
  minFrequency,
  showIgnored,
  showUnignored,
  type,
  word,
}: {
  searchValue: string
  minFrequency: string | number
  showIgnored: boolean
  showUnignored: boolean
  type: VocabTableType
  word: Word
}) {
  if (type === VocabTableType.SeriesOrWork && !showIgnored && word.ignored) {
    return false
  }

  if (type === VocabTableType.SeriesOrWork && !showUnignored && !word.ignored) {
    return false
  }

  if (
    searchValue !== '' &&
    !word.info.kanji.some((kanji) =>
      normalise(kanji).includes(normalise(searchValue))
    ) &&
    !word.info.kana.some((kana) =>
      normalise(kana).includes(normalise(searchValue))
    ) &&
    !word.info.meaning.some((meaning) =>
      meaning.some((synonym) =>
        normalise(synonym).includes(normalise(searchValue))
      )
    )
  ) {
    return false
  }

  if (
    isNumber(word.frequency) &&
    isNumber(minFrequency) &&
    word.frequency < minFrequency
  ) {
    return false
  }

  return true
}
