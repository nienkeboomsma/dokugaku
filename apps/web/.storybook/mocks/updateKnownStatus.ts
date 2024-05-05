import { UPDATE_KNOWN_STATUS } from '../../src/graphql/queries/vocabTableQueries'

export const updateKnownStatus = {
  request: {
    query: UPDATE_KNOWN_STATUS,
  },
  variableMatcher: () => true,
  result: {
    data: {
      updateKnownStatus: {
        __typename: 'UpdateWordStatusResponse',
        success: true,
      },
    },
  },
  maxUsageCount: Number.POSITIVE_INFINITY,
}
