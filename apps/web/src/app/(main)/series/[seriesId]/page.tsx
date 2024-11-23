'use client'

import { useParams } from 'next/navigation'

import Series from '../../../../components/Series/Series'
import { useGetSeriesInfo } from '../../../../hooks/useGetSeriesInfo'

export default function SeriesPage() {
  const { seriesId } = useParams()
  const { data, error, loading } = useGetSeriesInfo(seriesId as string)

  return (
    <>
      {data && <title>{data.title}</title>}
      <Series data={data} error={error} loading={loading} />
    </>
  )
}
