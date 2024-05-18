import { GQL_ReadStatus, GQL_WorkType } from '@repo/graphql-types'

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
  type: GQL_WorkType
  volumeNumber?: number
  volumes?: {
    id: string
    volumeNumber: number
  }[]
}
