import DashboardPage from '../../components/DashboardPage/DashboardPage'
import { mockCurrentWorks } from '../../fixtures/currentWorks'
import { mockVocab } from '../../fixtures/vocab'

export default function Dashboard() {
  return <DashboardPage works={mockCurrentWorks} initialVocab={mockVocab} />
}
