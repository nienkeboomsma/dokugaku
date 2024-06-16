import type { Dispatch, SetStateAction } from 'react'
import { ActionIcon } from '@mantine/core'
import { IconChevronsLeft } from '@tabler/icons-react'
import Link from 'next/link'

import classes from './MangaReaderHeader.module.css'
import Pagination from './Pagination'
import Settings from './Settings'

export default function MangaReaderHeader({
  currentPageNumber,
  fullscreen,
  maxPageNumber,
  setCurrentPageNumber,
  setTwoPageLayout,
  showTwoPages,
  toggleFullscreen,
  twoPageLayout,
  workId,
}: {
  currentPageNumber: number
  fullscreen: boolean
  maxPageNumber: number
  setCurrentPageNumber: Dispatch<SetStateAction<number>>
  setTwoPageLayout: Dispatch<SetStateAction<boolean>>
  showTwoPages: boolean
  toggleFullscreen: () => void
  twoPageLayout: boolean
  workId: string
}) {
  return (
    <div className={classes.container}>
      <ActionIcon
        component={Link}
        href={`/works/${workId}`}
        size='2rem'
        variant='subtle'
      >
        <IconChevronsLeft size='100%' stroke={1.5} />
      </ActionIcon>
      <Pagination
        currentPageNumber={currentPageNumber}
        maxPageNumber={maxPageNumber}
        setCurrentPageNumber={setCurrentPageNumber}
        showTwoPages={showTwoPages}
        twoPageLayout={twoPageLayout}
      />
      <Settings
        fullscreen={fullscreen}
        setTwoPageLayout={setTwoPageLayout}
        toggleFullscreen={toggleFullscreen}
        twoPageLayout={twoPageLayout}
      />
    </div>
  )
}
