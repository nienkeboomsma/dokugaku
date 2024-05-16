import SeriesPage from '../../../../components/SeriesPage/SeriesPage'
import { getSeriesInfo } from '../../../../graphql/queries/getSeriesInfo'

export default async function Series({
  params,
}: {
  params: { seriesId: string }
}) {
  const seriesInfo = await getSeriesInfo(params.seriesId)

  return <SeriesPage series={seriesInfo} />
}
