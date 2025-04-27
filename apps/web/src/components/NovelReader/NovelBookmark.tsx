import { memo } from 'react'
import { Badge, NumberFormatter } from '@mantine/core'

import classes from './NovelBookmark.module.css'
import Bookmark from '../Bookmark'

const NovelBookmark = memo(function NovelBookmark({
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

  return (
    <span className={classes.container}>
      <Bookmark
        ariaLabel={ariaLabel}
        id={`bookmark-${paragraphNumber}`}
        isCurrentProgress={isCurrentProgress}
        updateProgress={updateProgress}
      />
      <Badge classNames={{ root: classes.paragraphBadge }} component="span">
        <NumberFormatter thousandSeparator value={paragraphNumber} />
      </Badge>
    </span>
  )
})

export default NovelBookmark
