'use client'

import { useEffect, useMemo, useState } from 'react'
import { LoadingOverlay } from '@mantine/core'

import MangaPages from './MangaPages'
import type { Page } from '../../types/MangaPage'

export default function MangaReader({
  initialPageNumber,
  loading,
  maxPageNumber,
  pages,
}: {
  initialPageNumber: number
  loading: boolean
  maxPageNumber: number
  pages?: Page[]
}) {
  const [currentPageNumber, setCurrentPageNumber] = useState(initialPageNumber)
  const [twoPageLayout, setTwoPageLayout] = useState(true)

  const showTwoPages = useMemo(() => {
    const isCover = currentPageNumber === 1
    return twoPageLayout && !isCover
  }, [currentPageNumber, twoPageLayout])

  const getNewPageNumber = (
    currentPageNumber: number,
    direction: 'backward' | 'forward'
  ) => {
    const increment = showTwoPages ? 2 : 1
    const newPageNumber =
      direction === 'backward'
        ? currentPageNumber - increment
        : currentPageNumber + increment

    if (newPageNumber < 1) return 1
    if (newPageNumber > maxPageNumber) return maxPageNumber

    return newPageNumber
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      setCurrentPageNumber((prev) => getNewPageNumber(prev, 'forward'))
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      setCurrentPageNumber((prev) => getNewPageNumber(prev, 'backward'))
    }
  }

  useEffect(() => {
    if (typeof window === 'undefined') return

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [showTwoPages])

  if (loading || !pages) return <LoadingOverlay visible />

  return (
    <MangaPages
      currentPageNumber={currentPageNumber}
      pages={pages}
      showTwoPages={showTwoPages}
    />
  )
}
