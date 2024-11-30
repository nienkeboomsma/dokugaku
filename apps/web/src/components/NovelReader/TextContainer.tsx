'use client'

import { type ReactNode } from 'react'

import classes from './TextContainer.module.css'
import type { Direction } from '../../hooks/useNovelReaderDirection'

export default function TextContainer({
  children,
  direction,
}: {
  children: ReactNode
  direction: Direction
}) {
  // TODO: allow user to change line height, font size etc. in settings?
  const className =
    direction === 'horizontal'
      ? classes.containerHorizontal
      : classes.containerVertical

  const writingMode =
    direction === 'horizontal' ? 'horizontal-tb' : 'vertical-rl'

  return (
    <div
      className={`${classes.outerContainer} japanese`}
      style={{ writingMode }}
    >
      <div className={className}>{children}</div>
    </div>
  )
}
