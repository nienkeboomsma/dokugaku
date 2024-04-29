import WordsPage from '../../../components/WordsPage/WordsPage'
import { getExcludedOrKnownWords } from '../../../graphql/getExcludedOrKnownWords'

export default async function KnownWords() {
  const vocab = await getExcludedOrKnownWords('known')

  return (
    <WordsPage heading='Known words' type='knownWords' initialVocab={vocab} />
  )
}
