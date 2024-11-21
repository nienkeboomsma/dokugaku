'use client'

import { VocabTableType } from '../../../../components/VocabTable/VocabTable'
import WordsPage from '../../../../components/WordsPage/WordsPage'

export default function KnownWords() {
  return (
    <>
      <title>Known words</title>
      <WordsPage heading='Known words' type={VocabTableType.Known} />
    </>
  )
}
