import { GQL_ReadStatus, GQL_WorkType } from '@repo/graphql-types'

import { AuthorModel } from './AuthorModel'

export type WorkModel = {
  authors: AuthorModel[]
  hapaxLegomena: number
  id: string
  maxProgress: number
  modified: Date
  numberInSeries: number | null
  progress: number
  seriesId: string | null
  status: GQL_ReadStatus
  title: string
  type: GQL_WorkType
  totalWords: number
  uniqueWords: number
}
