import { gql } from '@apollo/client'
import {
  type GQL_CurrentWorksQuery,
  type GQL_CurrentWorksQueryVariables,
  GQL_ReadStatus,
} from '@repo/graphql-types'

import { getClient } from './ApolloClient'
import { type CurrentWork } from '../types/CurrentWork'

const CURRENT_WORKS = gql`
  query CurrentWorks($input: WorkListInput) {
    workList(input: $input) {
      id
      maxProgress
      progress
    }
  }
`

const variables: GQL_CurrentWorksQueryVariables = {
  input: {
    status: GQL_ReadStatus.Reading,
  },
}

export const getCurrentWorks = async () => {
  try {
    const { data } = await getClient().query<GQL_CurrentWorksQuery>({
      query: CURRENT_WORKS,
      variables,
    })

    const currentWorks: CurrentWork[] = data.workList

    return currentWorks
  } catch {
    return []
  }
}
