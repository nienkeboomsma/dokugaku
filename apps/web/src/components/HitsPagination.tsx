import { Dispatch, SetStateAction, useEffect } from 'react'
import { Pagination } from '@mantine/core'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'

import classes from './HitsPagination.module.css'

export default function HitsPagination({
  currentHitIndex,
  direction,
  hits,
  onChange,
  setCurrentHitIndex,
}: {
  currentHitIndex: number
  direction?: 'ltr' | 'rtl'
  hits: number[]
  onChange: (hit: number) => void
  setCurrentHitIndex: Dispatch<SetStateAction<number>>
}) {
  if (hits.length <= 0) return

  if (!onChange) {
    onChange = () => {}
  }

  useEffect(() => onChange(hits[0]!), [])

  return (
    <div className={classes.container} style={{ direction }}>
      <Pagination
        classNames={classes}
        nextIcon={direction === 'ltr' ? IconChevronRight : IconChevronLeft}
        onChange={(value) => {
          const nextIndex = value - 1
          setCurrentHitIndex(nextIndex)
          hits[nextIndex] && onChange(hits[nextIndex])
        }}
        previousIcon={direction === 'ltr' ? IconChevronLeft : IconChevronRight}
        total={hits.length}
        value={currentHitIndex + 1}
      />
    </div>
  )
}
