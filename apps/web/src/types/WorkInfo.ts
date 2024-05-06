import { GQL_ReadStatus } from '@repo/graphql-types'

export type WorkInfo = {
  id: string
  title: string
  authors: string[]
  isSeries: false
  seriesId?: string
  seriesTitle?: string
  status: GQL_ReadStatus
  progress: number
  maxProgress: number
}
