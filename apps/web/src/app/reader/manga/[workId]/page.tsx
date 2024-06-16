'use client'

import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import type { GQL_WorkProgressQuery } from '@repo/graphql-types'
import { LoadingOverlay } from '@mantine/core'

import type { Page } from '../../../../types/MangaPage'
import { WORK_PROGRESS } from '../../../../graphql/queries/workProgress'
import MangaReader from '../../../../components/MangaReader/MangaReader'
import { useUpdateWorkProgress } from '../../../../hooks/useUpdateWorkProgress'

const getImageSrc = (pageNumber: number, workId: string) => {
  const paddedPageNumber = pageNumber.toString().padStart(4, '0')
  return `/assets/${workId}/img${paddedPageNumber}.webp`
}

const getTextJsonUrl = (pageNumber: number, workId: string) => {
  const paddedPageNumber = pageNumber.toString().padStart(4, '0')
  // TODO: env
  return `http://localhost:3000/assets/${workId}/img${paddedPageNumber}.json`
}

const getPageData = async (pageNumbers: number[], workId: string) => {
  const pagePromises = pageNumbers.map(async (pageNumber) => {
    try {
      const res = await fetch(getTextJsonUrl(pageNumber, workId))
      const json = await res.json()
      const page = {
        imageSrc: getImageSrc(pageNumber, workId),
        pageNumber,
        textJson: json,
      }
      return page
    } catch {
      // TODO: add an 'page not found' placeholder, then remove 'undefined'
      //       from all Array<Page | undefined>
      return undefined
    }
  })

  return Promise.all(pagePromises)
}

export default function MangaReaderPage({
  params,
}: {
  params: { workId: string }
}) {
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

  const [initialPagesLoading, setInitialPagesLoading] = useState(true)
  const [initialPages, setInitialPages] = useState<Array<Page | undefined>>()

  const initialPageNumber = data?.work?.progress || 1

  useEffect(() => {
    if (!data || !data.work) return

    getPageData([initialPageNumber, initialPageNumber + 1], params.workId).then(
      (data) => {
        setInitialPages(data)
        setInitialPagesLoading(false)
      }
    )
  }, [data])

  const updateProgress = useUpdateWorkProgress()

  if (progressLoading || initialPagesLoading || !data?.work || !initialPages)
    return <LoadingOverlay visible />

  return (
    <MangaReader
      getPageData={(pageNumbers: number[]) =>
        getPageData(pageNumbers, params.workId)
      }
      initialPageNumber={initialPageNumber}
      initialPages={initialPages}
      maxPageNumber={data.work.maxProgress}
      updateProgress={(newProgress) =>
        updateProgress(newProgress, params.workId)
      }
      workId={params.workId}
    />
  )
}
