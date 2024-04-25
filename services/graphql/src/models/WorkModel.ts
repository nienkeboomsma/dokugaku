import { GQL_ReadStatus, GQL_WorkType } from '@repo/graphql-types'

import { AuthorModel } from './AuthorModel'

export type WorkModel = {
  authors: AuthorModel[]
  id: string
  maxProgress: number
  numberInSeries: number | null
  progress: number | null
  seriesId: string | null
  status: GQL_ReadStatus | null
  title: string
  type: GQL_WorkType
}
