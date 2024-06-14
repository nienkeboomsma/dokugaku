import React from 'react'
import { rem } from '@mantine/core'

import classes from './TextBox.module.css'
import type { TextBoxData } from '../../types/MangaTextJSON'

const determineFontSize = (
  imageWidth: number,
  height: number,
  lines: string[],
  vertical: boolean,
  width: number
) => {
  const MIN_FONT_SIZE = imageWidth / 60
  const MAX_FONT_SIZE = imageWidth / 30

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
  const idealFontSize = maxCharSize * 0.95

  if (idealFontSize < MIN_FONT_SIZE) return MIN_FONT_SIZE
  if (idealFontSize > MAX_FONT_SIZE) return MAX_FONT_SIZE

  return idealFontSize
}

export default function TextBox({
  imageWidth,
  textBox,
}: {
  imageWidth: number
  textBox: TextBoxData
}) {
  const { box: coordinates, lines, vertical } = textBox

  const left = coordinates[0]
  const width = coordinates[2] - coordinates[0]
  const top = coordinates[1]
  const height = coordinates[3] - coordinates[1]

  const textBoxBorderWidth = imageWidth / 150

  const hoverAreaStyles = {
    '--border-width': textBoxBorderWidth + 'px',
    '--hover-area-height': height + 'px',
    '--hover-area-width': width + 'px',
    '--left': left + 'px',
    '--top': top + 'px',
  } as React.CSSProperties

  const textBoxStyles = {
    '--flex-direction': vertical ? 'row-reverse' : 'column',
    '--text-box-height': vertical ? 'auto' : '100%',
    '--text-box-width': vertical ? 'auto' : 'max-content',
  } as React.CSSProperties

  const lineStyles = {
    '--font-size': rem(
      determineFontSize(imageWidth, height, lines, vertical, width)
    ),
    '--writing-mode': vertical ? 'vertical-rl' : 'horizontal-tb',
  } as React.CSSProperties

  return (
    <div className={classes.hoverArea} style={hoverAreaStyles}>
      <div className={`${classes.textBox} textBox`} style={textBoxStyles}>
        {lines.map((line, index) => (
          <p
            className={classes.line}
            key={`${index}-${JSON.stringify(coordinates)}`}
            style={lineStyles}
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  )
}
