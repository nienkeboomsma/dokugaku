import { useMutation } from '@apollo/client'
import { type GQL_UpdateWorkProgressMutation } from '@repo/graphql-types'

import { UPDATE_WORK_PROGRESS } from '../graphql/queries/updateWorkProgress'
import { isNumber } from '../types/utility'

export const useUpdateWorkProgress = () => {
  const [updateProgressMutation] =
    useMutation<GQL_UpdateWorkProgressMutation>(UPDATE_WORK_PROGRESS)

  const updateProgress = async (newProgress: number, workId: string) => {
    const { data } = await updateProgressMutation({
      variables: { input: { progress: newProgress, workId } },
    })

    if (!data) throw Error('Something went wrong')

    const { progress: updatedProgress, success } = data.updateWorkProgress

    if (!success || !isNumber(updatedProgress))
      throw Error('Something went wrong')

    return updatedProgress
  }

  return updateProgress
}
