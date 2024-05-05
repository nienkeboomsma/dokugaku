import { type Word } from '../../types/Word'
import { isNumber } from '../../types/utility'
import { VocabTableType } from './VocabTable'

export default function filterVocab({
  minFrequency,
  showIgnored,
  showUnignored,
  type,
  word,
}: {
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
    (type === VocabTableType.SeriesOrWork ||
      type === VocabTableType.Recommended) &&
    isNumber(word.frequency) &&
    isNumber(minFrequency) &&
    word.frequency < minFrequency
  ) {
    return false
  }

  return true
}
