import { useState } from 'react'
import { useLocalStorage } from '@mantine/hooks'
import { GQL_ReadStatus } from '@repo/graphql-types'

import {
  type VocabTableProps,
  VocabTableType,
} from '../components/VocabTable/VocabTable'
import type { SeriesInfo } from '../types/SeriesInfo'
import type { WorkInfo } from '../types/WorkInfo'
import { ListType } from '../components/VocabTable/VocabFilter/VocabSort'
import { getSeriesOrWork, isWork } from '../components/VocabTable/utils'
import {
  IgnoredOptions,
  JlptOptions,
} from '../components/VocabTable/VocabFilter/VocabFilter'

const getLocalStorageKeySuffix = (props: VocabTableProps) => {
  switch (props.type) {
    case VocabTableType.SeriesOrWork:
      return props.seriesOrWork.id
    case VocabTableType.Recommended:
      return 'recommended'
    case VocabTableType.Known:
      return 'known'
    case VocabTableType.Excluded:
      return 'excluded'
  }
}

const getFirstUnreadVolume = (
  seriesOrWork: SeriesInfo | WorkInfo | undefined
) => {
  if (!seriesOrWork || isWork(seriesOrWork)) return undefined

  const firstUnreadVolume = seriesOrWork.volumes.find(
    (volume) =>
      volume.status === GQL_ReadStatus.Reading ||
      volume.status === GQL_ReadStatus.WantToRead
  )

  return firstUnreadVolume
}

const getInitialMinPageNumber = (
  seriesOrWork: SeriesInfo | WorkInfo | undefined
) => {
  if (!seriesOrWork) return 1

  const currentProgress = isWork(seriesOrWork)
    ? seriesOrWork.progress
    : getFirstUnreadVolume(seriesOrWork)?.progress
  const maxProgress = isWork(seriesOrWork)
    ? seriesOrWork.maxProgress
    : getFirstUnreadVolume(seriesOrWork)?.maxProgress

  if (typeof currentProgress === 'undefined') return 1

  if (currentProgress === maxProgress) return 1

  if (currentProgress < 2) return 1

  return currentProgress + 1
}

const getInitialListType = (
  seriesOrWork: SeriesInfo | WorkInfo | undefined
) => {
  if (!seriesOrWork) return ListType.Frequency

  const readStatus = isWork(seriesOrWork)
    ? seriesOrWork.status
    : getFirstUnreadVolume(seriesOrWork)?.status

  if (readStatus === GQL_ReadStatus.Reading) return ListType.Glossary

  return ListType.Frequency
}

export default function useVocabTableFilters(props: VocabTableProps) {
  const seriesOrWork = getSeriesOrWork(props)

  const [listType, setListType] = useState(() =>
    getInitialListType(seriesOrWork)
  )

  const [showIgnoredOptions, setShowIgnoredOptions] =
    useLocalStorage<IgnoredOptions>({
      defaultValue: {
        ignored: { checked: true, label: 'Ignored' },
        unignored: { checked: true, label: 'Unignored' },
      },
      key: `DOKUGAKU_SHOW_IGNORED-${getLocalStorageKeySuffix(props)}`,
    })

  const [showJlptOptions, setShowJlptOptions] = useLocalStorage<JlptOptions>({
    defaultValue: {
      N1: { checked: true },
      N2: { checked: true },
      N3: { checked: true },
      N4: { checked: true },
      N5: { checked: true },
      nonJlpt: { checked: true, label: 'Non-JLPT' },
    },
    key: `DOKUGAKU_SHOW_JLPT-${getLocalStorageKeySuffix(props)}`,
  })

  const [minimumValues, setMinimumValues] = useLocalStorage({
    defaultValue: {
      volume: getFirstUnreadVolume(seriesOrWork)?.volumeNumber ?? 1,
      page: getInitialMinPageNumber(seriesOrWork),
      frequency: 1,
    },
    key: `DOKUGAKU_MINIMUM_VALUES-${getLocalStorageKeySuffix(props)}`,
  })

  const [searchValue, setSearchValue] = useState('')

  return {
    listType,
    minimumValues,
    searchValue,
    setListType,
    setMinimumValues,
    setSearchValue,
    setShowIgnoredOptions,
    setShowJlptOptions,
    showIgnoredOptions,
    showJlptOptions,
  }
}
