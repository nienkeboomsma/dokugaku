import { GQL_ReadStatus } from '@repo/graphql-types'

export type WorkInfo = {
  id: string
  title: string
  authors: string[]
  series: false
  seriesId?: string
  status: GQL_ReadStatus
  progress: number
  maxProgress: number
}
