'use client'

import { useEffect, useState } from 'react'
import { useDebouncedValue, useHotkeys, useLocalStorage } from '@mantine/hooks'
import { useRouter } from 'next/navigation'
import { AppShell, Pagination, rem } from '@mantine/core'
import { notifications } from '@mantine/notifications'

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
import HitsPagination from '../HitsPagination'

const determineCurrentPageNumber = (
  pageNumber: number,
  twoPageLayout: boolean
) => {
  if (!twoPageLayout) return pageNumber

  const isCover = pageNumber === 1
  const isEvenPage = pageNumber % 2 === 0

  if (isEvenPage || isCover) return pageNumber

  return pageNumber - 1
}

export default function MangaReader({
  getPageData,
  hits,
  initialPageNumber,
  maxPageNumber,
  updateProgress,
  workId,
}: {
  // TODO: decouple json from img; allow img to start loading before json
  //       arrives; filling in the textBoxes later is fine
  getPageData: (pageNumbers: number[]) => Promise<Array<Page | undefined>>
  hits: number[]
  initialPageNumber: number
  maxPageNumber: number
  updateProgress: (newProgress: number) => Promise<number>
  workId: string
}) {
  const [twoPageLayout, setTwoPageLayout] = useLocalStorage({
    defaultValue: true,
    getInitialValueInEffect: false,
    key: `DOKUGAKU_TWO_PAGE_LAYOUT-${workId}`,
  })
  const [currentPageNumber, setCurrentPageNumber] = useState(() =>
    determineCurrentPageNumber(initialPageNumber, twoPageLayout)
  )
  const [debouncedCurrentPageNumber] = useDebouncedValue(
    currentPageNumber,
    1000
  )
  const [currentHitIndex, setCurrentHitIndex] = useState(0)
  const [pages, setPages] = useState<Array<Page | undefined>>([])

  const showTwoPages = getShowTwoPages(
    currentPageNumber,
    maxPageNumber,
    twoPageLayout
  )

  useEffect(() => {
    setCurrentPageNumber((prev) =>
      determineCurrentPageNumber(prev, twoPageLayout)
    )
  }, [twoPageLayout])

  useEffect(() => {
    const pageNumbers = showTwoPages
      ? [currentPageNumber, currentPageNumber + 1]
      : [currentPageNumber]

    getPageData(pageNumbers).then((data) => setPages(data))
  }, [currentPageNumber, twoPageLayout])

  const router = useRouter()
  useEffect(() => {
    const sendData = async () => {
      try {
        const newProgress = showTwoPages
          ? currentPageNumber + 1
          : currentPageNumber
        await updateProgress(newProgress)

        // This flushes the NextJS router cache
        router.refresh()
      } catch (error) {
        console.log(error)
        notifications.show({
          title: 'Unable to save progress',
          message: (
            <span>
              Are the <code>db</code> and <code>graphql</code> containers
              running?
            </span>
          ),
          color: 'red',
        })
      }
    }
    sendData()
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
      classNames={classes}
      header={
        fullscreen
          ? { collapsed: true, height: headerHeight }
          : { height: headerHeight }
      }
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
        <HitsPagination
          currentHitIndex={currentHitIndex}
          direction='rtl'
          hits={hits}
          onChange={setCurrentPageNumber}
          setCurrentHitIndex={setCurrentHitIndex}
        />
      </AppShell.Main>
    </AppShell>
  )
}
