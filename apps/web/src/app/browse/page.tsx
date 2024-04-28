import BrowsePage from '../../components/BrowsePage/BrowsePage'
import { getWorkCards } from '../../graphql/getWorkCards'

// TODO: speed up the known vocab generation; use indexes in PG
//       and consider caching the value somehow

export default async function Browse() {
  const initialWorkCards = await getWorkCards()

  return <BrowsePage initialWorkCards={initialWorkCards} />
}
