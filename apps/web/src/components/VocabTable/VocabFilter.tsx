import { Dispatch, SetStateAction } from 'react'
import { Box, NumberInput, Switch, Text } from '@mantine/core'

import classes from './VocabFilter.module.css'
import { VocabTableType } from './VocabTable'
import { ListType } from './VocabSort'

export default function VocabFilter({
  listType,
  minFrequency,
  minPageNumber,
  setMinFrequency,
  setMinPageNumber,
  setShowIgnored,
  setShowUnignored,
  showIgnored,
  showUnignored,
  vocabTableType,
}: {
  listType?: ListType
  minFrequency: string | number
  minPageNumber: string | number
  setMinFrequency: Dispatch<SetStateAction<string | number>>
  setMinPageNumber: Dispatch<SetStateAction<string | number>>
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
      <div className={classes.minimumContainer}>
        {listType === ListType.Glossary && (
          <div>
            <Text fw={500} lh={1} mb='xs' mt='-0.25' size='sm'>
              Minimum page number
            </Text>
            <NumberInput
              min={1}
              onChange={setMinPageNumber}
              size='xs'
              value={minPageNumber}
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
      </div>
    </Box>
  )
}
