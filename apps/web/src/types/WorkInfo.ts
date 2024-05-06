import { GQL_ReadStatus } from '@repo/graphql-types'

export type WorkInfo = {
  authors: string[]
  id: string
  isSeries: false
  maxProgress: number
  progress: number
  seriesId?: string
  seriesTitle?: string
  status: GQL_ReadStatus
  title: string
  volumeNumber?: number
  volumes?: {
    id: string
    volumeNumber: number
  }[]
}
