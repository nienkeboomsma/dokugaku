import { UPDATE_WORK_PROGRESS } from '../../src/graphql/queries/updateWorkProgress'

export const updateWorkProgress = {
  request: {
    query: UPDATE_WORK_PROGRESS,
  },
  variableMatcher: () => true,
  result: {
    data: {
      updateWorkProgress: {
        __typename: 'UpdateWorkProgressResponse',
        code: 200,
        success: true,
        message: 'Work progress has successfully been updated',
        // TODO: make this dynamic
        progress: 2,
      },
    },
  },
}
