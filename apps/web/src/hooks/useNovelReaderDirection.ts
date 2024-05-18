import { useState } from 'react'

export type Direction = 'horizontal' | 'vertical'

export default function useNovelReaderDirection(initialDirection: Direction) {
  const [direction, setDirection] = useState<Direction>(initialDirection)

  const toggleDirection = () => {
    if (direction === 'horizontal') setDirection('vertical')
    if (direction === 'vertical') setDirection('horizontal')
  }

  return { direction, toggleDirection }
}
