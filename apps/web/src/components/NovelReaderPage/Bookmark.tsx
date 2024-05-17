import { ActionIcon } from '@mantine/core'
import { IconBookmark, IconBookmarkFilled } from '@tabler/icons-react'

import classes from './Bookmark.module.css'

export default function Bookmark({
  progress,
  paragraphNumber,
  updateProgress,
}: {
  progress: number
  paragraphNumber: number
  updateProgress: (paragraphNumber: number) => void
}) {
  const isCurrentProgress = progress === paragraphNumber
  const ariaLabel = isCurrentProgress
    ? 'This paragraph is bookmarked'
    : 'Bookmark this paragraph'
  const Icon = isCurrentProgress ? IconBookmarkFilled : IconBookmark

  return (
    <ActionIcon
      aria-label={ariaLabel}
      classNames={{ root: classes.button }}
      id={`bookmark-${paragraphNumber}`}
      onClick={() => updateProgress(paragraphNumber)}
      size='1em'
      variant='subtle'
    >
      <Icon size='100%' stroke={1.5} />
    </ActionIcon>
  )
}
