import { ActionIcon } from '@mantine/core'
import Link from 'next/link'
import {
  IconArrowAutofitDown,
  IconArrowAutofitRight,
  IconChevronsLeft,
} from '@tabler/icons-react'

import classes from './NovelReaderMenu.module.css'
import type { Direction } from '../../hooks/useNovelReaderDirection'

export default function NovelReaderMenu({
  direction,
  toggleDirection,
  workId,
}: {
  direction: Direction
  toggleDirection: () => void
  workId: string
}) {
  const DirectionIcon =
    direction === 'horizontal' ? IconArrowAutofitDown : IconArrowAutofitRight

  const flexDirection = direction === 'horizontal' ? 'column' : 'row-reverse'

  return (
    <div
      className={classes.container}
      style={{ '--flex-direction': flexDirection } as React.CSSProperties}
    >
      <ActionIcon
        component={Link}
        href={`/works/${workId}`}
        size='2rem'
        variant='subtle'
      >
        <IconChevronsLeft size='100%' stroke={1.5} />
      </ActionIcon>
      <ActionIcon onClick={toggleDirection} size='2rem' variant='subtle'>
        <DirectionIcon size='70%' stroke={2} />
      </ActionIcon>
    </div>
  )
}
