import SeriesPage from '../../../components/SeriesPage/SeriesPage'
import { mockSeriesInfo } from '../../../fixtures/seriesInfo'

export default function Series({ params }: { params: { seriesId: string } }) {
  return <SeriesPage series={mockSeriesInfo} />
}
