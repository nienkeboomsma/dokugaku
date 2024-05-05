import { GQL_ReadStatus } from '@repo/graphql-types'

export type VolumeInfo = {
  id: string
  maxProgress: number
  progress: number
  status: GQL_ReadStatus
  volumeNumber: number
}

export type SeriesInfo = {
  authors: string[]
  id: string
  series: true
  status: GQL_ReadStatus
  title: string
  volumes: VolumeInfo[]
}
