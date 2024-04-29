import { GQL_WorkType } from '@repo/graphql-types'

export type ExistingSeries = {
  authors: Set<string>
  nextVolumeNumber: number
  title: string
  volumeNumbers: number[]
  workTypes: Set<GQL_WorkType>
}[]
