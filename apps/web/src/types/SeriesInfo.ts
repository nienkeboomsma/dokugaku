import { GQL_ReadStatus } from '@repo/graphql-types'

export type VolumeInfo = {
  id: string
  maxProgress: number
  progress: number
  volumeNumber: number
}

export type SeriesInfo = {
  authors: string[]
  id: string
  status: GQL_ReadStatus
  title: string
  volumes: VolumeInfo[]
}
