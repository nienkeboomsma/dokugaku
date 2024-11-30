import type { Dispatch, SetStateAction } from 'react'
import { ActionIcon } from '@mantine/core'
import Link from 'next/link'
import {
  IconArrowAutofitDown,
  IconArrowAutofitRight,
  IconChevronsLeft,
  IconTypography,
} from '@tabler/icons-react'

import classes from './NovelReaderMenu.module.css'
import type { Direction } from '../../hooks/useNovelReaderDirection'
import { getPercentage } from '../../util/getPercentage'
import PopoverButton from '../SearchFilterSort/PopoverButton'
import TypographyOptions from './TypographyOptions'

export default function NovelReaderMenu({
  direction,
  fontSizeMultiplier,
  lineHeightMultiplier,
  maxProgress,
  progress,
  setFontSizeMultiplier,
  setLineHeightMultiplier,
  toggleDirection,
  workId,
}: {
  direction: Direction
  fontSizeMultiplier: number
  lineHeightMultiplier: number
  maxProgress: number
  progress: number
  setFontSizeMultiplier: Dispatch<SetStateAction<number>>
  setLineHeightMultiplier: Dispatch<SetStateAction<number>>
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
      <PopoverButton
        buttonIcon={IconTypography}
        buttonLabel='Typography options'
        buttonSize='2rem'
        buttonVariant='subtle'
        iconSize='70%'
        position={direction === 'horizontal' ? 'right' : 'bottom'}
        strokeSize={1.8}
      >
        <TypographyOptions
          fontSizeMultiplier={fontSizeMultiplier}
          lineHeightMultiplier={lineHeightMultiplier}
          setFontSizeMultiplier={setFontSizeMultiplier}
          setLineHeightMultiplier={setLineHeightMultiplier}
        />
      </PopoverButton>
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
