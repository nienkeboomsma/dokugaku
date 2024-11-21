import { gql } from '@apollo/client'
import type {
  GQL_WorkProgressQuery,
  GQL_WorkProgressQueryVariables,
} from '@repo/graphql-types'

import { getClient } from '../client/ApolloClient'

const WORK_PROGRESS = gql`
  query WorkProgress($workInput: WorkInput!) {
    work(input: $workInput) {
      id
      maxProgress
      progress
      title
    }
  }
`

export const getWorkProgress = async (workId: string) => {
  const variables: GQL_WorkProgressQueryVariables = {
    workInput: {
      workId,
    },
  }

  try {
    const { data } = await getClient().query<GQL_WorkProgressQuery>({
      query: WORK_PROGRESS,
      variables,
      context: {
        fetchOptions: {
          cache: 'no-store',
        },
      },
    })

    if (!data.work) return undefined

    return data.work
  } catch {
    return undefined
  }
}
