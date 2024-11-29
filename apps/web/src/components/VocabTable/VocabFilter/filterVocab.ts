import { isJLPT, type Word } from '../../../types/Word'
import { isNumber } from '../../../types/utility'
import { IgnoredOptions, JlptOptions } from './VocabFilter'
import { VocabTableType } from './../VocabTable'

export default function filterVocab({
  minFrequency,
  showIgnoredOptions,
  showJlptOptions,
  type,
  word,
}: {
  minFrequency: string | number
  showIgnoredOptions: IgnoredOptions
  showJlptOptions: JlptOptions
  type: VocabTableType
  word: Word
}) {
  if (
    type === VocabTableType.SeriesOrWork &&
    !showIgnoredOptions.ignored &&
    word.ignored
  ) {
    return false
  }

  if (
    type === VocabTableType.SeriesOrWork &&
    !showIgnoredOptions.unignored &&
    !word.ignored
  ) {
    return false
  }

  if (word.jlpt && isJLPT(word.jlpt) && !showJlptOptions[word.jlpt].checked)
    return false

  if (!word.jlpt && !showJlptOptions.nonJlpt.checked) return false

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
