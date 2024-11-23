'use client'

import Dashboard from '../../../components/Dashboard/Dashboard'
import { useGetCurrentWorks } from '../../../hooks/useGetCurrentWorks'

export default function BrowsePage() {
  const { data, error, loading } = useGetCurrentWorks()

  return (
    <>
      <title>Dashboard</title>
      <Dashboard data={data} error={error} loading={loading} />
    </>
  )
}
