import { GQL_ReadStatus } from '@repo/graphql-types'

import { AuthorModel } from './AuthorModel'

export type SeriesModel = {
  authors: AuthorModel[]
  id: string
  status: GQL_ReadStatus | null
  title: string
  workIds: string[]
}
