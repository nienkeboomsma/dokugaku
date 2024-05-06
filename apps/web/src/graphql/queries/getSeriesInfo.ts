import { gql } from '@apollo/client'
import {
  type GQL_SeriesInfoQuery,
  type GQL_SeriesInfoQueryVariables,
} from '@repo/graphql-types'

import { getClient } from '../client/ApolloClient'
import { type SeriesInfo, VolumeInfo } from '../../types/SeriesInfo'
import { isNumber } from '../../types/utility'

const SERIES_INFO = gql`
  query SeriesInfo($seriesInput: SeriesInput!) {
    series(input: $seriesInput) {
      authors {
        id
        name
      }
      id
      status
      title
      volumes {
        id
        maxProgress
        progress
        status
        volumeNumber: numberInSeries
      }
    }
  }
`

type VolumeInfoWithNull = {
  id: string
  maxProgress: number
  progress: number
  volumeNumber?: number | null
}

const hasVolumeNumber = (volume: VolumeInfoWithNull): volume is VolumeInfo =>
  isNumber(volume.volumeNumber)

export const getSeriesInfo = async (seriesId: string) => {
  const variables: GQL_SeriesInfoQueryVariables = {
    seriesInput: {
      seriesId,
    },
  }

  try {
    const { data } = await getClient().query<GQL_SeriesInfoQuery>({
      query: SERIES_INFO,
      variables,
    })

    if (!data.series) return undefined

    const authors = data.series.authors.map((author) => author.name)

    const volumes = data.series.volumes.filter(hasVolumeNumber)

    const seriesInfo: SeriesInfo = {
      ...data.series,
      authors,
      isSeries: true,
      volumes,
    }

    return seriesInfo
  } catch {
    return undefined
  }
}
