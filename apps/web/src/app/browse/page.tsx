import BrowsePage from '../../components/BrowsePage/BrowsePage'
import { getWorkCards } from '../../graphql/workCards'

export default async function Browse() {
  const initialWorkCards = await getWorkCards()

  return <BrowsePage initialWorkCards={initialWorkCards} />
}
