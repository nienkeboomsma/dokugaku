import SeriesPage from '../../../components/SeriesPage/SeriesPage'
import { getSeriesInfo } from '../../../graphql/getSeriesInfo'
import { getSeriesVocab } from '../../../graphql/getSeriesVocab'

export default async function Series({
  params,
}: {
  params: { seriesId: string }
}) {
  const seriesInfo = await getSeriesInfo(params.seriesId)
  const workIds = seriesInfo?.volumes.map((volume) => volume.id)
  const vocab = workIds ? await getSeriesVocab(params.seriesId, workIds) : []

  return <SeriesPage initialVocab={vocab} series={seriesInfo} />
}
