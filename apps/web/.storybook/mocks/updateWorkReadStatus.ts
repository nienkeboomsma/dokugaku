import { GQL_ReadStatus } from '@repo/graphql-types'

import { UPDATE_WORK_READ_STATUS } from '../../src/graphql/queries/updateReadStatus'

export const updateWorkReadStatus = {
  request: {
    query: UPDATE_WORK_READ_STATUS,
  },
  variableMatcher: () => true,
  result: {
    data: {
      updateWorkReadStatus: {
        __typename: 'UpdateReadStatusResponse',
        code: 200,
        success: true,
        message: 'Work status has successfully been updated',
        // TODO: make this dynamic
        status: GQL_ReadStatus.Abandoned,
      },
    },
  },
  maxUsageCount: Number.POSITIVE_INFINITY,
}
