import { UPDATE_IGNORED_STATUS } from '../../src/graphql/queries/vocabTableQueries'

export const updateIgnoredStatus = {
  request: {
    query: UPDATE_IGNORED_STATUS,
  },
  variableMatcher: () => true,
  result: {
    data: {
      updateIgnoredStatus: {
        __typename: 'UpdateWordStatusResponse',
        success: true,
      },
    },
  },
  maxUsageCount: Number.POSITIVE_INFINITY,
}
