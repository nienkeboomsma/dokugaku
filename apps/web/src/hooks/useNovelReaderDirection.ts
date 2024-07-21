import { useLocalStorage } from '@mantine/hooks'

export type Direction = 'horizontal' | 'vertical'

export default function useNovelReaderDirection(
  initialDirection: Direction,
  workId: string
) {
  const [direction, setDirection] = useLocalStorage<Direction>({
    defaultValue: initialDirection,
    getInitialValueInEffect: false,
    key: `DOKUGAKU_READER_DIRECTION-${workId}`,
  })

  const toggleDirection = () => {
    if (direction === 'horizontal') setDirection('vertical')
    if (direction === 'vertical') setDirection('horizontal')
  }

  return { direction, toggleDirection }
}
