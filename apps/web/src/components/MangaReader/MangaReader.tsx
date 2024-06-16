import { useEffect, useState } from 'react'
import { useDebouncedValue, useHotkeys, useLocalStorage } from '@mantine/hooks'
import { AppShell, rem } from '@mantine/core'

import classes from './MangaReader.module.css'
import type { Page } from '../../types/MangaPage'
import {
  getLastPageNumber,
  getNewPageNumber,
  getShowTwoPages,
} from '../../util/getPageNumber'
import useFullscreen from '../../hooks/useFullscreen'
import MangaReaderHeader from './MangaReaderHeader'
import MangaPages from './MangaPages'

export default function MangaReader({
  getPageData,
  initialPageNumber,
  maxPageNumber,
  updateProgress,
  workId,
}: {
  // TODO: decouple json from img; allow img to start loading before json
  //       arrives; filling in the textBoxes later is fine
  getPageData: (pageNumbers: number[]) => Promise<Array<Page | undefined>>
  initialPageNumber: number
  maxPageNumber: number
  updateProgress: (newProgress: number) => Promise<number>
  workId: string
}) {
  const [currentPageNumber, setCurrentPageNumber] = useState(initialPageNumber)
  const [debouncedCurrentPageNumber] = useDebouncedValue(
    currentPageNumber,
    1000
  )
  const [pages, setPages] = useState<Array<Page | undefined>>([])
  const [twoPageLayout, setTwoPageLayout] = useLocalStorage({
    defaultValue: true,
    getInitialValueInEffect: false,
    key: `DOKUGAKU_TWO_PAGE_LAYOUT-${workId}`,
  })

  const showTwoPages = getShowTwoPages(
    currentPageNumber,
    maxPageNumber,
    twoPageLayout
  )

  useEffect(() => {
    if (!twoPageLayout) return

    const isCover = currentPageNumber === 1
    const isEvenPage = currentPageNumber % 2 === 0

    if (isEvenPage || isCover) return

    setCurrentPageNumber(currentPageNumber - 1)
  }, [twoPageLayout])

  useEffect(() => {
    // TODO: When showTwoPages changes value between rerenders it briefly
    //       displays the pages incorrectly; use a ref to compare values and
    //       adjust accordingly...?

    const pageNumbers = showTwoPages
      ? [currentPageNumber, currentPageNumber + 1]
      : [currentPageNumber]

    getPageData(pageNumbers).then((data) => setPages(data))
  }, [currentPageNumber, twoPageLayout])

  useEffect(() => {
    const newProgress = showTwoPages ? currentPageNumber + 1 : currentPageNumber
    updateProgress(newProgress)
  }, [debouncedCurrentPageNumber])

  useHotkeys([
    [
      'Tab',
      (event) => {
        if (event.key === 'Tab') {
          document.body.classList.add(`${classes.userIsTabbing}`)
        }
      },
      { preventDefault: false },
    ],
    [
      'ArrowLeft',
      () =>
        setCurrentPageNumber((prev) =>
          getNewPageNumber(prev, maxPageNumber, 'forward', twoPageLayout)
        ),
      { preventDefault: true },
    ],
    [
      'ArrowRight',
      () =>
        setCurrentPageNumber((prev) =>
          getNewPageNumber(prev, maxPageNumber, 'backward', twoPageLayout)
        ),
      { preventDefault: true },
    ],
    [']', () => setCurrentPageNumber(1), { preventDefault: true }],
    [
      '[',
      () =>
        setCurrentPageNumber(getLastPageNumber(maxPageNumber, twoPageLayout)),
      { preventDefault: true },
    ],
    ['1', () => setTwoPageLayout(false), { preventDefault: true }],
    ['2', () => setTwoPageLayout(true), { preventDefault: true }],
  ])

  const { fullscreen, toggleFullscreen } = useFullscreen()
  const headerHeight = fullscreen ? '0px' : rem(50)

  return (
    <AppShell
      // TODO: consolidate with header in mainLayout
      classNames={{
        header: classes.header,
        main: classes.main,
      }}
      header={fullscreen ? undefined : { height: headerHeight }}
    >
      {!fullscreen && (
        <AppShell.Header>
          <MangaReaderHeader
            currentPageNumber={currentPageNumber}
            fullscreen={fullscreen}
            maxPageNumber={maxPageNumber}
            setCurrentPageNumber={setCurrentPageNumber}
            setTwoPageLayout={setTwoPageLayout}
            showTwoPages={showTwoPages}
            toggleFullscreen={toggleFullscreen}
            twoPageLayout={twoPageLayout}
            workId={workId}
          />
        </AppShell.Header>
      )}
      <AppShell.Main style={{ '--header-height': headerHeight }}>
        <MangaPages pages={pages} showTwoPages={showTwoPages} />
      </AppShell.Main>
    </AppShell>
  )
}
