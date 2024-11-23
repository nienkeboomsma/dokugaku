'use client'

import { useParams } from 'next/navigation'

import Series from '../../../../components/Series/Series'
import { useGetSeriesInfo } from '../../../../hooks/useGetSeriesInfo'
import SeriesSkeleton from '../../../../components/Series/SeriesSkeleton'

export default function SeriesPage() {
  const { seriesId } = useParams()
  const { data, error, loading } = useGetSeriesInfo(seriesId as string)

  // TODO: add a proper error page
  if (error) return 'Oops'

  if (!data || loading) return <SeriesSkeleton />

  return (
    <>
      {data && <title>{data.title}</title>}
      <Series series={data} />
    </>
  )
}
