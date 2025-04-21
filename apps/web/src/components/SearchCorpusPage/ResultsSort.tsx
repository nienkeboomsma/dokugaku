/* eslint-disable no-unused-vars */
import { Dispatch, SetStateAction } from 'react'
import { Radio, Stack } from '@mantine/core'

export enum SortOrder {
  Alphabetical = 'alphabetical',
  HitCount = 'hitCount',
}

export default function ResultsSort({
  sortOrder,
  setSortOrder,
}: {
  sortOrder: SortOrder
  setSortOrder: Dispatch<SetStateAction<SortOrder>>
}) {
  return (
    <Radio.Group
      aria-label="Sort by"
      name="sortOrder"
      onChange={setSortOrder as Dispatch<SetStateAction<string>>}
      value={sortOrder}
    >
      <Stack>
        <Radio value={SortOrder.HitCount} label="Number of results" />
        <Radio value={SortOrder.Alphabetical} label="Title" />
      </Stack>
    </Radio.Group>
  )
}
