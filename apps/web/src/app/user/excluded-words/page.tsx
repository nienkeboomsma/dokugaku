import WordsPage from '../../../components/WordsPage/WordsPage'
import { getExcludedOrKnownWords } from '../../../graphql/getExcludedOrKnownWords'

export default async function ExcludedWords() {
  const vocab = await getExcludedOrKnownWords('excluded')

  return (
    <WordsPage
      heading='Excluded words'
      type='excludedEverywhere'
      initialVocab={vocab}
    />
  )
}
