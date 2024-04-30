import { gql } from '@apollo/client'
import {
  type GQL_WorkInfoQuery,
  type GQL_WorkInfoQueryVariables,
} from '@repo/graphql-types'

import { getClient } from './ApolloClient'
import { WorkInfo } from '../types/WorkInfo'

export const getWorkInfo = async (workId: string) => {
  const WORK_INFO = gql`
    query WorkInfo($workInput: WorkInput!) {
      work(input: $workInput) {
        authors {
          name
        }
        id
        maxProgress
        progress
        status
        title
      }
    }
  `

  const variables: GQL_WorkInfoQueryVariables = {
    workInput: {
      workId,
    },
  }

  try {
    const { data } = await getClient().query<GQL_WorkInfoQuery>({
      query: WORK_INFO,
      variables,
    })

    if (!data.work) return undefined

    const workInfo: WorkInfo = {
      ...data.work,
      authors: data.work.authors.map((author) => author.name),
    }

    return workInfo
  } catch {
    return undefined
  }
}
