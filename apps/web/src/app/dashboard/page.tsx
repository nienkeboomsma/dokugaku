import DashboardPage from '../../components/DashboardPage/DashboardPage'
import { mockVocab } from '../../fixtures/vocab'
import { getCurrentWorks } from '../../graphql/getCurrentWorks'

export default async function Dashboard() {
  const currentWorks = await getCurrentWorks()

  return <DashboardPage works={currentWorks} initialVocab={mockVocab} />
}
