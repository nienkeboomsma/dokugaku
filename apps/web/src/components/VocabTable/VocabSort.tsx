import { Radio, Stack } from '@mantine/core'
import { Dispatch, SetStateAction } from 'react'

type SortOptions = 'frequency' | 'firstOccurrence'

export default function VocabSort({
  sortOrder,
  setSortOrder,
}: {
  sortOrder: SortOptions
  setSortOrder: Dispatch<SetStateAction<SortOptions>>
}) {
  return (
    <Radio.Group
      label='Sort vocab by'
      mt='-0.1875rem'
      name='sortOrder'
      onChange={setSortOrder as Dispatch<SetStateAction<string>>}
      pb={3}
      value={sortOrder}
    >
      <Stack mt='xs'>
        <Radio value='frequency' label='Frequency' />
        <Radio value='firstOccurrence' label='First occurrence' />
      </Stack>
    </Radio.Group>
  )
}
