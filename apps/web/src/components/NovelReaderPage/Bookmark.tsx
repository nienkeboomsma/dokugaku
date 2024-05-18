import { memo } from 'react'
import { ActionIcon } from '@mantine/core'
import { IconBookmark, IconBookmarkFilled } from '@tabler/icons-react'

import classes from './Bookmark.module.css'

const Bookmark = memo(function Bookmark({
  isCurrentProgress,
  paragraphNumber,
  updateProgress,
}: {
  isCurrentProgress: boolean
  paragraphNumber: number
  updateProgress: () => void
}) {
  const ariaLabel = isCurrentProgress
    ? 'This paragraph is bookmarked'
    : 'Bookmark this paragraph'
  const Icon = isCurrentProgress ? IconBookmarkFilled : IconBookmark

  return (
    <ActionIcon
      aria-label={ariaLabel}
      classNames={{ root: classes.button }}
      id={`bookmark-${paragraphNumber}`}
      onClick={updateProgress}
      size='1em'
      variant='subtle'
    >
      <Icon size='100%' stroke={1.5} />
    </ActionIcon>
  )
})

export default Bookmark
