'use client'

import { useUpdateWorkProgress } from '../../hooks/useUpdateWorkProgress'
import { WorkInfo } from '../../types/WorkInfo'
import MangaReader from './MangaReader'

const getImageSrc = (pageNumber: number, workId: string) => {
  const paddedPageNumber = pageNumber.toString().padStart(4, '0')
  return `/assets/${workId}/img${paddedPageNumber}.webp`
}

const getTextJsonUrl = (pageNumber: number, workId: string) => {
  const paddedPageNumber = pageNumber.toString().padStart(4, '0')
  return `/assets/${workId}/img${paddedPageNumber}.json`
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
  openAtPage,
  workProgress,
}: {
  openAtPage?: number
  workProgress?: Pick<WorkInfo, 'id' | 'maxProgress' | 'progress' | 'title'>
}) {
  if (!workProgress) return 'Oops'

  const initialPageNumber = openAtPage || workProgress.progress || 1
  const updateProgress = useUpdateWorkProgress()

  return (
    <MangaReader
      getPageData={(pageNumbers: number[]) =>
        getPageData(pageNumbers, workProgress.id)
      }
      initialPageNumber={initialPageNumber}
      maxPageNumber={workProgress.maxProgress}
      updateProgress={(newProgress) =>
        updateProgress(newProgress, workProgress.id)
      }
      workId={workProgress.id}
    />
  )
}
