import type {
  GQL_SeriesInfoQuery,
  GQL_SeriesInfoQueryVariables,
} from '@repo/graphql-types'
import { useQuery } from '@apollo/client'

import type { SeriesInfo, VolumeInfo } from '../types/SeriesInfo'
import { isNumber } from '../types/utility'
import { SERIES_INFO } from '../graphql/queries/getSeriesInfo'

type VolumeInfoWithNull = {
  id: string
  maxProgress: number
  progress: number
  volumeNumber?: number | null
}

const hasVolumeNumber = (volume: VolumeInfoWithNull): volume is VolumeInfo =>
  isNumber(volume.volumeNumber)

export const useGetSeriesInfo = (seriesId: string) => {
  const variables: GQL_SeriesInfoQueryVariables = {
    seriesInput: {
      seriesId,
    },
  }

  const {
    data: rawData,
    error,
    loading,
  } = useQuery<GQL_SeriesInfoQuery>(SERIES_INFO, {
    context: {
      fetchOptions: {
        cache: 'no-store',
      },
    },
    variables,
  })

  if (!rawData || !rawData.series) return { error, loading }

  const authors = rawData.series.authors.map((author) => author.name)

  const volumes = rawData.series.volumes.filter(hasVolumeNumber)

  const data: SeriesInfo = {
    ...rawData.series,
    authors,
    isSeries: true,
    volumes,
  }

  return { data, loading }
}
