'use client'

import { useParams } from 'next/navigation'

import { useGetWorkInfo } from '../../../../hooks/useGetWorkInfo'
import WorkSkeleton from '../../../../components/Work/WorkSkeleton'
import Work from '../../../../components/Work/Work'

export default function WorkPage() {
  const { workId } = useParams()
  const { data, error, loading } = useGetWorkInfo(workId as string)

  // TODO: add a proper error page
  if (error) return 'Oops'

  if (!data || loading) return <WorkSkeleton />

  return (
    <>
      {data && <title>{data.title}</title>}
      <Work work={data} />
    </>
  )
}
