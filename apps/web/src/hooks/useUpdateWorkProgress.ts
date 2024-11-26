import { useMutation } from '@apollo/client'
import { type GQL_UpdateWorkProgressMutation } from '@repo/graphql-types'

import { UPDATE_WORK_PROGRESS } from '../graphql/queries/updateWorkProgress'

export const useUpdateWorkProgress = () => {
  const [updateProgressMutation] =
    useMutation<GQL_UpdateWorkProgressMutation>(UPDATE_WORK_PROGRESS)

  const updateProgress = async (newProgress: number, workId: string) => {
    const { data } = await updateProgressMutation({
      variables: { input: { progress: newProgress, workId } },
    })

    if (
      !data ||
      !data.updateWorkProgress.success ||
      !data.updateWorkProgress.progress
    )
      throw Error

    return data.updateWorkProgress.progress
  }

  return updateProgress
}
