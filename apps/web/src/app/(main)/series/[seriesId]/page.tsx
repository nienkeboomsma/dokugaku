import { Metadata } from 'next'
import SeriesPage from '../../../../components/SeriesPage/SeriesPage'
import { getSeriesInfo } from '../../../../graphql/queries/getSeriesInfo'

export const metadata: Metadata = {
  icons:
    'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📋</text></svg>',
}

export default async function Series({
  params,
}: {
  params: { seriesId: string }
}) {
  const seriesInfo = await getSeriesInfo(params.seriesId)

  return (
    <>
      {seriesInfo && <title>{seriesInfo.title}</title>}
      <SeriesPage series={seriesInfo} />
    </>
  )
}
