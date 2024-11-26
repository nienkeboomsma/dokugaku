import { ArrayToStringLiteral } from '../types/utility'

const defaultColors = [
  'red',
  'pink',
  'grape',
  'violet',
  'indigo',
  'blue',
  'cyan',
  'teal',
  'green',
  'lime',
  'yellow',
  'orange',
] as const

export type Color = ArrayToStringLiteral<typeof defaultColors>

const getColorIndex = (color: Color) => {
  return defaultColors.findIndex((defaultColor) => defaultColor === color)
}

export function getOffsetThemeColor(color: Color, offset: number) {
  const index = getColorIndex(color)
  if (index < 0) return color

  const arrayLength = defaultColors.length

  // Apply the offset with wrapping
  const offsetIndex = (index + offset + arrayLength) % arrayLength

  return defaultColors[offsetIndex] as Color
}
