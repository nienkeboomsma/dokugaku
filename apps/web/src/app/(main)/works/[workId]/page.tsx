'use client'

import { useParams } from 'next/navigation'

import { useGetWorkInfo } from '../../../../hooks/useGetWorkInfo'
import Work from '../../../../components/Work/Work'

export default function WorkPage() {
  const { workId } = useParams()
  const { data, error, loading } = useGetWorkInfo(workId as string)

  return (
    <>
      {data && <title>{data.title}</title>}
      <Work data={data} error={error} loading={loading} />
    </>
  )
}
