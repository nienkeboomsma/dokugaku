import type { Dispatch, SetStateAction } from 'react'
import { ActionIcon, Progress } from '@mantine/core'
import { IconChevronsLeft } from '@tabler/icons-react'
import Link from 'next/link'

import classes from './MangaReaderHeader.module.css'
import { getPercentage } from '../../util/getPercentage'
import Pagination from './Pagination'
import Settings from './Settings'
import Bookmark from '../Bookmark'

export default function MangaReaderHeader({
  currentPageNumber,
  fullscreen,
  isSavedBookmark,
  maxPageNumber,
  saveBookmark,
  setCurrentPageNumber,
  setTwoPageLayout,
  showTwoPages,
  toggleFullscreen,
  twoPageLayout,
  workId,
}: {
  currentPageNumber: number
  fullscreen: boolean
  isSavedBookmark: boolean
  maxPageNumber: number
  saveBookmark: () => {}
  setCurrentPageNumber: Dispatch<SetStateAction<number>>
  setTwoPageLayout: Dispatch<SetStateAction<boolean>>
  showTwoPages: boolean
  toggleFullscreen: () => void
  twoPageLayout: boolean
  workId: string
}) {
  const progress = showTwoPages
    ? getPercentage(currentPageNumber + 1, maxPageNumber)
    : getPercentage(currentPageNumber, maxPageNumber)

  return (
    <div className={classes.container}>
      <Progress
        classNames={{
          root: classes.progressRoot,
          section: classes.progressSection,
        }}
        radius={0}
        size="xs"
        value={progress}
      />
      <div className={classes.controls}>
        <div>
          <ActionIcon
            aria-label="Go to work page"
            className={classes.back}
            component={Link}
            href={`/works/${workId}`}
            size="2rem"
            variant="subtle"
          >
            <IconChevronsLeft size="100%" stroke={1.5} />
          </ActionIcon>
        </div>
        <Pagination
          currentPageNumber={currentPageNumber}
          maxPageNumber={maxPageNumber}
          setCurrentPageNumber={setCurrentPageNumber}
          showTwoPages={showTwoPages}
          twoPageLayout={twoPageLayout}
        />
        <Settings
          currentPageNumber={currentPageNumber}
          isSavedBookmark={isSavedBookmark}
          fullscreen={fullscreen}
          saveBookmark={saveBookmark}
          setTwoPageLayout={setTwoPageLayout}
          toggleFullscreen={toggleFullscreen}
          twoPageLayout={twoPageLayout}
        />
      </div>
    </div>
  )
}
