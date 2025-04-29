import { memo } from 'react'
import { Badge, NumberFormatter } from '@mantine/core'

import classes from './NovelBookmark.module.css'
import Bookmark from '../Bookmark'

const NovelBookmark = memo(function NovelBookmark({
  isSavedBookmark,
  paragraphNumber,
  saveBookmark,
}: {
  isSavedBookmark: boolean
  paragraphNumber: number
  saveBookmark: () => void
}) {
  const ariaLabel = isSavedBookmark
    ? `Paragraph ${paragraphNumber} is bookmarked`
    : `Bookmark paragraph ${paragraphNumber}`

  return (
    <span className={classes.container}>
      <Bookmark
        ariaLabel={ariaLabel}
        id={`bookmark-${paragraphNumber}`}
        isSavedBookmark={isSavedBookmark}
        size="1em"
        saveBookmark={saveBookmark}
      />
      <Badge classNames={{ root: classes.paragraphBadge }} component="span">
        <NumberFormatter thousandSeparator value={paragraphNumber} />
      </Badge>
    </span>
  )
})

export default NovelBookmark
