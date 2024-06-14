import { useEffect, useMemo, useState } from 'react'
import { useIsFirstRender } from '@mantine/hooks'

import classes from './MangaReader.module.css'
import MangaPages from './MangaPages'
import type { Page } from '../../types/MangaPage'

export default function MangaReader({
  getPageData,
  initialPageNumber,
  initialPages,
  maxPageNumber,
  updateProgress,
}: {
  getPageData: (pageNumbers: number[]) => Promise<Array<Page | undefined>>
  initialPageNumber: number
  initialPages: Array<Page | undefined>
  maxPageNumber: number
  updateProgress: (newProgress: number) => Promise<number>
}) {
  const [currentPageNumber, setCurrentPageNumber] = useState(initialPageNumber)
  const [twoPageLayout, setTwoPageLayout] = useState(true)
  const [pages, setPages] = useState<Array<Page | undefined>>(initialPages)

  const showTwoPages = useMemo(() => {
    const isCover = currentPageNumber === 1
    return twoPageLayout && !isCover
  }, [currentPageNumber, twoPageLayout])

  const firstRender = useIsFirstRender()

  useEffect(() => {
    if (firstRender) return
    // When switching from a one-page to a two-page view (and vice versa) it
    // briefly displays the pages incorrectly before rerendering and showing
    // them correctly; this prevents that.
    if (!showTwoPages) setPages([])

    const pageNumbers = showTwoPages
      ? [currentPageNumber, currentPageNumber + 1]
      : [currentPageNumber]

    getPageData(pageNumbers).then((data) => setPages(data))
  }, [currentPageNumber, showTwoPages])

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

  return (
    <div className={classes.container}>
      <MangaPages pages={pages} showTwoPages={showTwoPages} />
    </div>
  )
}
