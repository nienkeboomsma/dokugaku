import { UPDATE_EXCLUDED_STATUS } from '../../src/graphql/queries/vocabTableQueries'

export const updateExcludedStatus = {
  request: {
    query: UPDATE_EXCLUDED_STATUS,
  },
  variableMatcher: () => true,
  result: {
    data: {
      updateExcludedStatus: {
        __typename: 'UpdateWordStatusResponse',
        success: true,
      },
    },
  },
  maxUsageCount: Number.POSITIVE_INFINITY,
}
