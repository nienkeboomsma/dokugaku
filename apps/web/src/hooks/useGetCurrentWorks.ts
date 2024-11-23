import { useQuery } from '@apollo/client'
import {
  type GQL_CurrentWorksQuery,
  type GQL_CurrentWorksQueryVariables,
  GQL_ReadStatus,
  GQL_SortOrder,
} from '@repo/graphql-types'

import { CURRENT_WORKS } from '../graphql/queries/getCurrentWorks'

export const useGetCurrentWorks = () => {
  const variables: GQL_CurrentWorksQueryVariables = {
    input: {
      sortOrder: GQL_SortOrder.Modified,
      status: GQL_ReadStatus.Reading,
    },
  }

  const {
    data: rawData,
    error,
    loading,
  } = useQuery<GQL_CurrentWorksQuery>(CURRENT_WORKS, {
    variables,
  })

  if (!rawData) return { error, loading }

  const data = rawData.workList

  return { data, loading }
}
