import { memo } from 'react'
import { ActionIcon, Badge, NumberFormatter } from '@mantine/core'
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
    ? `Paragraph ${paragraphNumber} is bookmarked`
    : `Bookmark paragraph ${paragraphNumber}`
  const Icon = isCurrentProgress ? IconBookmarkFilled : IconBookmark

  return (
    <span className={classes.container}>
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
      <Badge classNames={{ root: classes.paragraphBadge }} component='span'>
        <NumberFormatter thousandSeparator value={paragraphNumber} />
      </Badge>
    </span>
  )
})

export default Bookmark
