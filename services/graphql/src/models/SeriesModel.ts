import { GQL_ReadStatus } from '@repo/graphql-types'

import { AuthorModel } from './AuthorModel'

export type SeriesModel = {
  authors: AuthorModel[]
  hapaxLegomena: number
  id: string
  status: GQL_ReadStatus
  title: string
  totalWords: number
  uniqueWords: number
  workIds: string[]
}
