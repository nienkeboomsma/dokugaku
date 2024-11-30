'use client'

import type { ReactNode } from 'react'

import classes from './TextContainer.module.css'
import type { Direction } from '../../hooks/useNovelReaderDirection'

export default function TextContainer({
  children,
  direction,
  fontSizeMultiplier,
  lineHeightMultiplier,
}: {
  children: ReactNode
  direction: Direction
  fontSizeMultiplier: number
  lineHeightMultiplier: number
}) {
  const className =
    direction === 'horizontal'
      ? classes.containerHorizontal
      : classes.containerVertical

  const writingMode =
    direction === 'horizontal' ? 'horizontal-tb' : 'vertical-rl'

  const style = {
    '--font-size-multiplier': fontSizeMultiplier,
    '--line-height-multiplier': lineHeightMultiplier,
    writingMode,
  } as React.CSSProperties

  return (
    <div className={`${classes.outerContainer} japanese`} style={style}>
      <div className={className}>{children}</div>
    </div>
  )
}
