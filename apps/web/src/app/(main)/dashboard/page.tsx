import { Metadata } from 'next'
import DashboardPage from '../../../components/DashboardPage/DashboardPage'
import { getCurrentWorks } from '../../../graphql/queries/getCurrentWorks'

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default async function Dashboard() {
  const currentWorks = await getCurrentWorks()

  return <DashboardPage works={currentWorks} />
}
