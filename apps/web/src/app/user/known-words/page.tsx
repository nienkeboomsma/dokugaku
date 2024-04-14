import WordsPage from '../../../components/WordsPage/WordsPage'
import { mockVocab } from '../../../fixtures/vocab'

export default function KnownWords() {
  return (
    <WordsPage
      heading='Known words'
      type='knownWords'
      initialVocab={mockVocab}
    />
  )
}
