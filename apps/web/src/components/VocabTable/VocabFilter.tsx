import { Dispatch, SetStateAction } from 'react'
import { Box, NumberInput, Switch, Text } from '@mantine/core'

import classes from './VocabFilter.module.css'
import { VocabTableType } from './VocabTable'

export default function VocabFilter({
  minFrequency,
  setMinFrequency,
  setShowIgnored,
  setShowUnignored,
  showIgnored,
  showUnignored,
  vocabTableType,
}: {
  minFrequency: string | number
  setMinFrequency: Dispatch<SetStateAction<string | number>>
  setShowIgnored: Dispatch<SetStateAction<boolean>>
  setShowUnignored: Dispatch<SetStateAction<boolean>>
  showIgnored: boolean
  showUnignored: boolean
  vocabTableType: VocabTableType
}) {
  return (
    <Box className={classes.container}>
      {vocabTableType === VocabTableType.SeriesOrWork && (
        <div className={classes.ignoredContainer}>
          <Switch
            checked={showIgnored}
            label='Show ignored'
            onChange={(event) => setShowIgnored(event.currentTarget.checked)}
          />
          <Switch
            checked={showUnignored}
            label='Show unignored'
            onChange={(event) => setShowUnignored(event.currentTarget.checked)}
          />
        </div>
      )}
      <div>
        <Text fw={500} lh={1} mb='xs' mt='-0.25' size='sm'>
          Minimum frequency
        </Text>
        <NumberInput
          min={1}
          onChange={setMinFrequency}
          size='xs'
          value={minFrequency}
        />
      </div>
    </Box>
  )
}
