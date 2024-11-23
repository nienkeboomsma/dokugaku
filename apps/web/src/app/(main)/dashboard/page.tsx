'use client'

import Dashboard from '../../../components/Dashboard/Dashboard'
import DashboardSkeleton from '../../../components/Dashboard/DashboardSkeleton'
import { useGetCurrentWorks } from '../../../hooks/useGetCurrentWorks'

export default function BrowsePage() {
  const { data, error, loading } = useGetCurrentWorks()

  // TODO: add a proper error page
  if (error) return 'Oops'

  if (!data || loading) return <DashboardSkeleton />

  return (
    <>
      <title>Dashboard</title>
      <Dashboard currentWorks={data} />
    </>
  )
}
