import { gql } from '@apollo/client'
import {
  type GQL_CurrentWorksQuery,
  type GQL_CurrentWorksQueryVariables,
  GQL_ReadStatus,
} from '@repo/graphql-types'

import { getClient } from './ApolloClient'
import { CurrentWork } from '../types/CurrentWork'

const CURRENT_WORKS = gql`
  query CurrentWorks($input: WorkListInput) {
    workList(input: $input) {
      id
      maxProgress
      progress
    }
  }
`

// TODO: this should be centrally supplied
const userId = '6e41e9fd-c813-40e9-91fd-c51e47efab42'

const variables: GQL_CurrentWorksQueryVariables = {
  input: {
    status: GQL_ReadStatus.Reading,
    userId,
  },
}

export const getCurrentWorks = async () => {
  try {
    const { data } = await getClient().query<GQL_CurrentWorksQuery>({
      query: CURRENT_WORKS,
      variables,
    })

    const currentWorks: CurrentWork[] = data.workList.map((work) => {
      if (!work.progress) {
        const workWithoutNull = { id: work.id, maxProgress: work.maxProgress }
        return workWithoutNull
      }
      return work
    })

    return currentWorks
  } catch {
    return []
  }
}
