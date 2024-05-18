import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { GQL_UpdateWorkProgressMutation } from '@repo/graphql-types'
import { notifications } from '@mantine/notifications'

import { UPDATE_WORK_PROGRESS } from '../graphql/queries/updateWorkProgress'
import { isNumber } from '../types/utility'

export default function useBookmarkProgress(
  initialProgress: number,
  workId: string
) {
  const [progress, setProgress] = useState(initialProgress)
  // TODO: evict stale data from cache
  // TODO: implement optimistic response
  const [updateProgressMutation] =
    useMutation<GQL_UpdateWorkProgressMutation>(UPDATE_WORK_PROGRESS)

  const updateProgress = async (
    paragraphNumber: number,
    isCurrentProgress: boolean
  ) => {
    const newProgress = !isCurrentProgress ? paragraphNumber : 0

    try {
      const { data } = await updateProgressMutation({
        variables: { input: { progress: newProgress, workId } },
      })

      if (!data) throw Error('Something went wrong')

      const { progress: updatedProgress, success } = data.updateWorkProgress

      if (!success || !isNumber(updatedProgress))
        throw Error('Something went wrong')

      setProgress(updatedProgress)
    } catch {
      notifications.show({
        title: 'Something went wrong',
        message: 'Please try again later',
        style: { direction: 'ltr' },
      })
    }
  }

  return { progress, updateProgress }
}
