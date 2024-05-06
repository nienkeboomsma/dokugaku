import { gql } from '@apollo/client'
import {
  type GQL_WorkInfoQuery,
  type GQL_WorkInfoQueryVariables,
} from '@repo/graphql-types'

import { getClient } from '../client/ApolloClient'
import { type WorkInfo } from '../../types/WorkInfo'

export const getWorkInfo = async (workId: string) => {
  const WORK_INFO = gql`
    query WorkInfo($workInput: WorkInput!) {
      work(input: $workInput) {
        authors {
          id
          name
        }
        id
        maxProgress
        progress
        series {
          id
          title
        }
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
      isSeries: false,
      seriesId: data.work.series?.id ?? undefined,
      seriesTitle: data.work.series?.title ?? undefined,
    }

    return workInfo
  } catch {
    return undefined
  }
}
