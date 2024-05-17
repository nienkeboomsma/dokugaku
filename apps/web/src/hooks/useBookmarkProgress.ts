import { useState } from 'react'

export default function useBookmarkProgress(initialProgress: number) {
  const [progress, setProgress] = useState(initialProgress)

  const createUpdateProgress =
    (workId: string) => (paragraphNumber: number) => {
      console.table({ paragraphNumber, progress })
      const newProgress = paragraphNumber !== progress ? paragraphNumber : 0

      // TODO: upload progress to db
      setProgress(newProgress)
    }

  return { progress, createUpdateProgress }
}
