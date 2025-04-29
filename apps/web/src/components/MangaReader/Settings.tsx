import type { Dispatch, SetStateAction } from 'react'
import { ActionIcon } from '@mantine/core'
import {
  IconBoxMultiple2,
  IconMaximize,
  IconMinimize,
  IconSquareNumber1,
} from '@tabler/icons-react'

import classes from './Settings.module.css'
import Bookmark from '../Bookmark'

export default function Settings({
  currentPageNumber,
  isSavedBookmark,
  fullscreen,
  saveBookmark,
  setTwoPageLayout,
  toggleFullscreen,
  twoPageLayout,
}: {
  currentPageNumber: number
  isSavedBookmark: boolean
  fullscreen: boolean
  saveBookmark: () => void
  setTwoPageLayout: Dispatch<SetStateAction<boolean>>
  toggleFullscreen: () => void
  twoPageLayout: boolean
}) {
  const ariaLabel = isSavedBookmark
    ? `Page ${currentPageNumber} is bookmarked`
    : `Bookmark page ${currentPageNumber}`

  return (
    <div className={classes.container}>
      <Bookmark
        ariaLabel={ariaLabel}
        isSavedBookmark={isSavedBookmark}
        iconSize="80%"
        saveBookmark={saveBookmark}
        size="2rem"
        stroke={1.8}
      />
      {twoPageLayout ? (
        <ActionIcon
          aria-label="Display one page"
          onClick={() => setTwoPageLayout(false)}
          size="2rem"
          variant="subtle"
        >
          <IconSquareNumber1 size="75%" stroke={1.7} />
        </ActionIcon>
      ) : (
        <ActionIcon
          aria-label="Display two pages"
          onClick={() => setTwoPageLayout(true)}
          size="2rem"
          variant="subtle"
        >
          <IconBoxMultiple2 size="75%" stroke={1.7} />
        </ActionIcon>
      )}

      <ActionIcon
        aria-label="Toggle fullscreen mode"
        onClick={toggleFullscreen}
        size="2rem"
        variant="subtle"
      >
        {fullscreen ? (
          <IconMinimize size="90%" stroke={1.6} />
        ) : (
          <IconMaximize size="80%" stroke={1.9} />
        )}
      </ActionIcon>
    </div>
  )
}
