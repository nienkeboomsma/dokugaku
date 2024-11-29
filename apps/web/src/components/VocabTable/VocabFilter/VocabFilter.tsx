import { Dispatch, SetStateAction } from 'react'
import { Box } from '@mantine/core'

import classes from './VocabFilter.module.css'
import { VocabTableType } from '../VocabTable'
import { ListType } from './VocabSort'
import CheckboxGroup, { Options } from './CheckboxGroup'
import MinimumValueFilters from './MinimumValueFilters'

export type Option = { checked: boolean; label?: string }

export interface IgnoredOptions extends Options {
  ignored: Option
  unignored: Option
}

export interface JlptOptions extends Options {
  N1: Option
  N2: Option
  N3: Option
  N4: Option
  N5: Option
  nonJlpt: Option
}

export type MinimumValues = {
  volume: number
  page: number
  frequency: number
}

export default function VocabFilter({
  isSeries,
  listType,
  minimumValues,
  setMinimumValues,
  setShowIgnoredOptions,
  setShowJlptOptions,
  showIgnoredOptions,
  showJlptOptions,
  vocabTableType,
}: {
  isSeries: boolean
  listType?: ListType
  minimumValues: MinimumValues
  setMinimumValues: Dispatch<SetStateAction<MinimumValues>>
  setShowIgnoredOptions: Dispatch<SetStateAction<IgnoredOptions>>
  setShowJlptOptions: Dispatch<SetStateAction<JlptOptions>>
  showIgnoredOptions: IgnoredOptions
  showJlptOptions: JlptOptions
  vocabTableType: VocabTableType
}) {
  const showIgnoredWordsFilters = vocabTableType === VocabTableType.SeriesOrWork

  const showMinimumFrequencyFilter =
    vocabTableType !== VocabTableType.Excluded &&
    vocabTableType !== VocabTableType.Known

  const showMinimumVolumeNumberFilter =
    listType === ListType.Glossary && isSeries

  const showMinimumPageNumberFilter = listType === ListType.Glossary

  return (
    <Box className={classes.container}>
      {showMinimumFrequencyFilter && (
        <MinimumValueFilters
          minimumValues={minimumValues}
          setMinimumValues={setMinimumValues}
          showMinimumPageNumberFilter={showMinimumPageNumberFilter}
          showMinimumVolumeNumberFilter={showMinimumVolumeNumberFilter}
        />
      )}

      {showIgnoredWordsFilters && (
        <CheckboxGroup
          options={showIgnoredOptions}
          setOptions={setShowIgnoredOptions}
        />
      )}

      <CheckboxGroup
        options={showJlptOptions}
        setOptions={setShowJlptOptions}
      />
    </Box>
  )
}
