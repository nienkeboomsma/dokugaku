import type { SeriesInfo } from '../../types/SeriesInfo'
import type { WorkInfo } from '../../types/WorkInfo'
import { type VocabTableProps, VocabTableType } from './VocabTable'

export const getSeriesOrWork = (props: VocabTableProps) => {
  return props.type === VocabTableType.SeriesOrWork
    ? props.seriesOrWork
    : undefined
}

export const isSeries = (
  seriesOrWork: SeriesInfo | WorkInfo | undefined
): seriesOrWork is SeriesInfo => {
  if (!seriesOrWork) return false
  return seriesOrWork?.isSeries
}

export const isWork = (
  seriesOrWork: SeriesInfo | WorkInfo | undefined
): seriesOrWork is WorkInfo => {
  if (!seriesOrWork) return false
  return !isSeries(seriesOrWork)
}

export const isPartOfSeries = (
  seriesOrWork: SeriesInfo | WorkInfo | undefined
) => {
  return isWork(seriesOrWork) && !!seriesOrWork?.seriesId
}
