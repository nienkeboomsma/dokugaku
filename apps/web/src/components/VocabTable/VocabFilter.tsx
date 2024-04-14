import { Dispatch, SetStateAction } from 'react'
import { Box, NumberInput, Text } from '@mantine/core'

export default function VocabFilter({
  minFrequency,
  setMinFrequency,
}: {
  minFrequency: string | number
  setMinFrequency: Dispatch<SetStateAction<string | number>>
}) {
  return (
    <Box w={165}>
      <Text fw={500} lh={1} mb='xs' mt='-0.25' size='sm'>
        Minimum frequency
      </Text>
      <NumberInput
        min={1}
        onChange={setMinFrequency}
        size='xs'
        value={minFrequency}
      />
    </Box>
  )
}
