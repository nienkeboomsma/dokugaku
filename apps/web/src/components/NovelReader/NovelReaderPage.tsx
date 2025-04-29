'use client'

import { useEffect, useState } from 'react'

import { WorkInfo } from '../../types/WorkInfo'
import { NovelJSONContent } from '../../types/NovelJSONContent'
import { useUpdateWorkProgress } from '../../hooks/useUpdateWorkProgress'
import { LoadingOverlay } from '@mantine/core'
import NovelReader from './NovelReader'

export default function NovelReaderPage({
  hits,
  workProgress,
}: {
  hits: number[]
  workProgress?: Pick<WorkInfo, 'id' | 'maxProgress' | 'progress' | 'title'>
}) {
  if (!workProgress) return 'Oops'

  const [textNodesLoading, setTextNodesLoading] = useState(true)
  const [textNodes, setTextNodes] = useState<NovelJSONContent[]>()

  useEffect(() => {
    fetch(`/assets/${workProgress.id}/text.json`)
      .then((data) => data.json())
      .then((json) => {
        setTextNodes(json.content)
        setTextNodesLoading(false)
      })
  }, [])

  const updateProgress = useUpdateWorkProgress()

  if (textNodesLoading || !textNodes) return <LoadingOverlay visible />

  return (
    <>
      {workProgress.title && <title>{workProgress.title}</title>}
      <NovelReader
        fileDir={`/assets/${workProgress.id}/`}
        hits={hits}
        initialProgress={workProgress.progress}
        maxProgress={workProgress.maxProgress}
        saveBookmark={(newProgress) =>
          updateProgress(newProgress, workProgress.id)
        }
        textNodes={textNodes}
        workId={workProgress.id}
      />
    </>
  )
}
