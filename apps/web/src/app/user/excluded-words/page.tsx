import WordsPage from '../../../components/WordsPage/WordsPage'
import { mockVocab } from '../../../fixtures/vocab'

export default function ExcludedWords() {
  return (
    <WordsPage
      heading='Excluded words'
      type='excludedEverywhere'
      initialVocab={mockVocab}
    />
  )
}
