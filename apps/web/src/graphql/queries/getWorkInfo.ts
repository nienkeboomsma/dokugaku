import { gql } from '@apollo/client'
import {
  type GQL_WorkInfoQuery,
  type GQL_WorkInfoQueryVariables,
} from '@repo/graphql-types'

import { getClient } from '../client/ApolloClient'
import { type WorkInfo } from '../../types/WorkInfo'
import { isNumber } from '../../types/utility'

const WORK_INFO = gql`
  query WorkInfo($workInput: WorkInput!) {
    work(input: $workInput) {
      authors {
        id
        name
      }
      id
      maxProgress
      progress
      series {
        id
        title
        volumes {
          id
          volumeNumber: numberInSeries
        }
      }
      status
      title
      volumeNumber: numberInSeries
    }
  }
`

type VolumeInfo = {
  id: string
  volumeNumber: number
}

type VolumeInfoWithNull = {
  id: string
  volumeNumber?: number | null
}

const hasVolumeNumber = (volume: VolumeInfoWithNull): volume is VolumeInfo =>
  isNumber(volume.volumeNumber)

export const getWorkInfo = async (workId: string) => {
  const variables: GQL_WorkInfoQueryVariables = {
    workInput: {
      workId,
    },
  }

  try {
    const { data } = await getClient().query<GQL_WorkInfoQuery>({
      query: WORK_INFO,
      variables,
    })

    if (!data.work) return undefined

    const volumes = data.work.series?.volumes
      .filter(hasVolumeNumber)
      .map((volume) => {
        return { id: volume.id, volumeNumber: volume.volumeNumber }
      })

    const workInfo: WorkInfo = {
      ...data.work,
      authors: data.work.authors.map((author) => author.name),
      isSeries: false,
      seriesId: data.work.series?.id ?? undefined,
      seriesTitle: data.work.series?.title ?? undefined,
      volumeNumber: data.work.volumeNumber ?? undefined,
      volumes,
    }

    return workInfo
  } catch {
    return undefined
  }
}
