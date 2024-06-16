import { ActionIcon } from '@mantine/core'
import Link from 'next/link'
import {
  IconArrowAutofitDown,
  IconArrowAutofitRight,
  IconChevronsLeft,
} from '@tabler/icons-react'

import classes from './NovelReaderMenu.module.css'
import type { Direction } from '../../hooks/useNovelReaderDirection'
import { getPercentage } from '../../util/getPercentage'

export default function NovelReaderMenu({
  direction,
  maxProgress,
  progress,
  toggleDirection,
  workId,
}: {
  direction: Direction
  maxProgress: number
  progress: number
  toggleDirection: () => void
  workId: string
}) {
  const flexDirection = direction === 'horizontal' ? 'column' : 'row-reverse'

  const progressClassName =
    direction === 'horizontal'
      ? `${classes.progress} ${classes.progressHorizontal}`
      : `${classes.progress} ${classes.progressVertical}`

  const DirectionIcon =
    direction === 'horizontal' ? IconArrowAutofitDown : IconArrowAutofitRight
  const ariabLabel = `Set writing mode to ${direction === 'horizontal' ? 'vertical' : 'horizontal'}`

  return (
    <div
      className={`${classes.container} `}
      style={{ '--flex-direction': flexDirection } as React.CSSProperties}
    >
      <ActionIcon
        aria-label='Go to work page'
        component={Link}
        href={`/works/${workId}`}
        size='2rem'
        variant='subtle'
      >
        <IconChevronsLeft size='100%' stroke={1.5} />
      </ActionIcon>
      <ActionIcon
        aria-label={ariabLabel}
        onClick={toggleDirection}
        size='2rem'
        variant='subtle'
      >
        <DirectionIcon size='70%' stroke={2} />
      </ActionIcon>
      <div className={progressClassName}>
        <span>{getPercentage(progress, maxProgress, { round: 'up' })}%</span>
      </div>
    </div>
  )
}
