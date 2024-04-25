import { GQL_WorkType } from '@repo/graphql-types'

export type ExistingSeries = {
  authors: string[]
  nextVolumeNumber: number
  title: string
  types: GQL_WorkType[]
}
