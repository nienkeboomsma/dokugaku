import BrowsePage from '../../components/BrowsePage/BrowsePage'
import { getWorkCards } from '../../graphql/queries/getWorkCards'

// TODO: if necessary: cache the knownVocab value
// TODO: add pagination

// required to skip SSG during build; without this line, build will fail if
// there is no pre-existing .next cache and it can't get a GQL response, both
// of which are the case when a user first uses docker compose up
// TODO: investigate why this is only an issue for this specific page
export const dynamic = "force-dynamic";

export default async function Browse() {
  const initialWorkCards = await getWorkCards()

  return <BrowsePage initialWorkCards={initialWorkCards} />
}
