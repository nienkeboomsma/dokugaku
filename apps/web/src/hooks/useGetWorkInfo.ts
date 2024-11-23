import { useQuery } from '@apollo/client'
import type {
  GQL_WorkInfoQuery,
  GQL_WorkInfoQueryVariables,
} from '@repo/graphql-types'

import { isNumber } from '../types/utility'
import { WORK_INFO } from '../graphql/queries/getWorkInfo'
import type { WorkInfo } from '../types/WorkInfo'

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

export const useGetWorkInfo = (workId: string) => {
  const variables: GQL_WorkInfoQueryVariables = {
    workInput: {
      workId,
    },
  }

  const {
    data: rawData,
    error,
    loading,
  } = useQuery<GQL_WorkInfoQuery>(WORK_INFO, {
    variables,
  })

  if (!rawData || !rawData.work) return { error, loading }

  const volumes = rawData.work.series?.volumes
    .filter(hasVolumeNumber)
    .map((volume) => {
      return { id: volume.id, volumeNumber: volume.volumeNumber }
    })

  const data: WorkInfo = {
    ...rawData.work,
    authors: rawData.work.authors.map((author) => author.name),
    isSeries: false,
    seriesId: rawData.work.series?.id ?? undefined,
    seriesTitle: rawData.work.series?.title ?? undefined,
    volumeNumber: rawData.work.volumeNumber ?? undefined,
    volumes,
  }

  return { data, loading }
}
