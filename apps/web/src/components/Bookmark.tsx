import { memo } from 'react'
import { ActionIcon } from '@mantine/core'
import { IconBookmark, IconBookmarkFilled } from '@tabler/icons-react'

import classes from './Bookmark.module.css'

const Bookmark = memo(function Bookmark({
  ariaLabel,
  id,
  isCurrentProgress,
  updateProgress,
}: {
  ariaLabel: string
  id: string
  isCurrentProgress: boolean
  updateProgress: () => void
}) {
  const Icon = isCurrentProgress ? IconBookmarkFilled : IconBookmark

  return (
    <ActionIcon
      aria-label={ariaLabel}
      classNames={{ root: classes.button }}
      id={id}
      onClick={updateProgress}
      size="1em"
      variant="subtle"
    >
      <Icon size="100%" stroke={1.5} />
    </ActionIcon>
  )
})

export default Bookmark
