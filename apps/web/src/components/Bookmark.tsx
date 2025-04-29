import { memo } from 'react'
import { ActionIcon } from '@mantine/core'
import { IconBookmark, IconBookmarkFilled } from '@tabler/icons-react'

import classes from './Bookmark.module.css'

const Bookmark = memo(function Bookmark({
  ariaLabel,
  iconSize,
  id,
  isSavedBookmark,
  size,
  stroke,
  saveBookmark,
}: {
  ariaLabel: string
  iconSize?: string
  id?: string
  isSavedBookmark: boolean
  size?: string
  stroke?: number
  saveBookmark: () => void
}) {
  const Icon = isSavedBookmark ? IconBookmarkFilled : IconBookmark

  return (
    <ActionIcon
      aria-label={ariaLabel}
      classNames={{ root: classes.button }}
      id={id}
      onClick={saveBookmark}
      size={size}
      variant="subtle"
    >
      <Icon size={iconSize ?? '100%'} stroke={stroke ?? 1.5} />
    </ActionIcon>
  )
})

export default Bookmark
