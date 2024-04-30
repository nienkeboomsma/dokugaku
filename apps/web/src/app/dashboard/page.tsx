import DashboardPage from '../../components/DashboardPage/DashboardPage'
import { getCurrentWorks } from '../../graphql/getCurrentWorks'
import { getRecommendedVocab } from '../../graphql/getRecommendedVocab'

export default async function Dashboard() {
  const currentWorks = await getCurrentWorks()
  const vocab = await getRecommendedVocab()

  return <DashboardPage works={currentWorks} initialVocab={vocab} />
}
