import React from 'react'
import { rem } from '@mantine/core'

import classes from './TextBlock.module.css'

const determineFontSize = (
  height: number,
  lines: string[],
  vertical: boolean,
  width: number
) => {
  const longestLine = lines.slice().sort((lineA, lineB) => {
    return lineB.length - lineA.length
  })[0]

  if (!longestLine) return '0'

  const longestLineLength = longestLine.length

  const maxLineWidth = vertical
    ? width / lines.length
    : width / longestLineLength
  const maxLineHeight = vertical
    ? height / longestLineLength
    : height / lines.length

  const maxCharSize = Math.min(maxLineHeight, maxLineWidth)

  return rem(maxCharSize * 0.95)
}

export default function TextBlock({
  coordinates,
  // fontSize,
  lines,
  vertical,
}: {
  coordinates: [number, number, number, number]
  // fontSize: number
  lines: string[]
  vertical: boolean
}) {
  const left = coordinates[0]
  const width = coordinates[2] - coordinates[0]
  const top = coordinates[1]
  const height = coordinates[3] - coordinates[1]

  const wrapperStyles = {
    '--flex-direction': vertical ? 'row-reverse' : 'column',
    '--font-size': determineFontSize(height, lines, vertical, width),
    '--height': height + 'px',
    '--left': left + 'px',
    '--top': top + 'px',
    '--width': width + 'px',
  } as React.CSSProperties

  const lineStyles = {
    '--writing-mode': vertical ? 'vertical-rl' : 'horizontal-tb',
  } as React.CSSProperties

  return (
    <div className={classes.container} style={wrapperStyles}>
      {lines.map((line, index) => (
        <div
          className={classes.line}
          key={`${index}-${JSON.stringify(coordinates)}`}
          style={lineStyles}
        >
          {line}
        </div>
      ))}
    </div>
  )
}
