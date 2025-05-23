'use client'

import { VocabTableType } from '../../../../components/VocabTable/VocabTable'
import WordsPage from '../../../../components/WordsPage/WordsPage'

export default function ExcludedWords() {
  return (
    <>
      <title>Excluded words</title>
      <WordsPage heading='Excluded words' type={VocabTableType.Excluded} />
    </>
  )
}
