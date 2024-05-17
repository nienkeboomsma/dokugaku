import { useState } from 'react'
import { useMutation } from '@apollo/client'

import { UPDATE_WORK_PROGRESS } from '../graphql/queries/updateWorkProgress'

export default function useBookmarkProgress(initialProgress: number) {
  const [progress, setProgress] = useState(initialProgress)
  // TODO: evict stale data from cache
  // TODO: implement optimistic response
  const [updateProgress] = useMutation(UPDATE_WORK_PROGRESS)

  const createUpdateProgress =
    (workId: string) => async (paragraphNumber: number) => {
      console.table({ paragraphNumber, progress })
      const newProgress = paragraphNumber !== progress ? paragraphNumber : 0

      const { data } = await updateProgress({
        variables: { input: { progress: newProgress, workId } },
      })
      const { progress: updatedProgress, success } = data.updateWorkProgress

      if (success) {
        setProgress(updatedProgress)
      }
    }

  return { progress, createUpdateProgress }
}
