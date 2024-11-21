import { Metadata } from 'next'
import BrowsePage from '../../../components/BrowsePage/BrowsePage'
import { getWorkCards } from '../../../graphql/queries/getWorkCards'

// TODO: if necessary: cache the knownVocab value
// TODO: add pagination

export const metadata: Metadata = {
  title: 'Browse',
}

export default async function Browse() {
  const initialWorkCards = await getWorkCards()

  return <BrowsePage initialWorkCards={initialWorkCards} />
}
