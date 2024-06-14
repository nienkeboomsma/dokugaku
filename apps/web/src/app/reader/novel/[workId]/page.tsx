'use client'

import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import type { GQL_WorkProgressQuery } from '@repo/graphql-types'
import { LoadingOverlay } from '@mantine/core'

import type { NovelJSONContent } from '../../../../types/NovelJSONContent'
import { WORK_PROGRESS } from '../../../../graphql/queries/workProgress'
import { useUpdateWorkProgress } from '../../../../hooks/useUpdateWorkProgress'
import NovelReader from '../../../../components/NovelReader/NovelReader'

export default function NovelReaderPage({
  params,
}: {
  params: { workId: string }
}) {
  const [textNodesLoading, setTextNodesLoading] = useState(true)
  const [textNodes, setTextNodes] = useState<NovelJSONContent[]>()

  useEffect(() => {
    fetch(
      // TODO: env
      `http://localhost:3000/assets/${params.workId}/text.json`
    )
      .then((data) => data.json())
      .then((json) => {
        setTextNodes(json.content)
        setTextNodesLoading(false)
      })
  }, [])

  const { data, loading: progressLoading } = useQuery<GQL_WorkProgressQuery>(
    WORK_PROGRESS,
    {
      variables: {
        workInput: {
          workId: params.workId,
        },
      },
      fetchPolicy: 'no-cache',
    }
  )

  const updateProgress = useUpdateWorkProgress()

  if (textNodesLoading || progressLoading || !textNodes || !data || !data.work)
    return <LoadingOverlay visible />

  return (
    <NovelReader
      initialProgress={data.work.progress}
      updateProgress={(newProgress) =>
        updateProgress(newProgress, params.workId)
      }
      textNodes={textNodes}
      workId={params.workId}
    />
  )
}
