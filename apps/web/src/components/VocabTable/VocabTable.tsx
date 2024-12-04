/* eslint-disable no-unused-vars */
'use client'

import { useCallback, useRef } from 'react'
import { Box } from '@mantine/core'
import { DataTable, DataTableColumn } from 'mantine-datatable'
import { IconMoodSad } from '@tabler/icons-react'

import classes from './VocabTable.module.css'
import type { SeriesInfo } from '../../types/SeriesInfo'
import type { Word } from '../../types/Word'
import type { WorkInfo } from '../../types/WorkInfo'
import Reading from './Reading'
import Meaning from './Meaning'
import ActionButtons from './ActionButtons'
import SearchFilterSort from '../SearchFilterSort/SearchFilterSort'
import VocabFilter from './VocabFilter/VocabFilter'
import VocabSort, { ListType } from './VocabFilter/VocabSort'
import useVocabTableFilters from '../../hooks/useVocabTableFilters'
import useVocabTableRequests from '../../hooks/useVocabTableRequests'
import { getSeriesOrWork, isPartOfSeries, isSeries, isWork } from './utils'

const BATCH_SIZE = 250
const MAX_WIDTH = '52rem'

export enum VocabTableType {
  Excluded = 'excluded',
  Known = 'known',
  Recommended = 'recommended',
  SeriesOrWork = 'seriesOrWork',
}

type VocabTablePropsCorpus = {
  furigana?: boolean
  type:
    | VocabTableType.Excluded
    | VocabTableType.Known
    | VocabTableType.Recommended
}

type VocabTablePropsSeriesOrWork = {
  furigana?: boolean
  seriesOrWork: SeriesInfo | WorkInfo
  type: VocabTableType.SeriesOrWork
}

export type VocabTableProps =
  | VocabTablePropsCorpus
  | VocabTablePropsSeriesOrWork

export default function VocabTable(props: VocabTableProps) {
  const { furigana, type } = props
  const seriesOrWork = getSeriesOrWork(props)

  const scrollViewportRef = useRef<HTMLDivElement>(null)

  const {
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
  } = useVocabTableFilters(props)

  const {
    handleExcludeWord,
    handleIgnoredWord,
    handleKnownWord,
    handleUnexcludeWord,
    handleUnignoredWord,
    handleUnknownWord,
    loading,
    loadMoreRecords,
    records,
  } = useVocabTableRequests(props, {
    batchSize: BATCH_SIZE,
    listType,
    minimumValues,
    searchValue,
    showIgnoredOptions,
    showJlptOptions,
  })

  // TODO: see if a fixed width for reading/frequency/actions makes sense
  const allColumns: DataTableColumn<Word>[] = [
    {
      accessor: 'reading',
      noWrap: true,
      render: (vocab: Word) => <Reading vocab={vocab} furigana={furigana} />,
    },
    {
      accessor: 'meaning',
      render: (vocab: Word) => <Meaning vocab={vocab} />,
    },
    {
      accessor: 'volumeNumber',
      title: 'Vol.',
      textAlign: 'right',
    },
    {
      accessor: 'pageNumber',
      title: 'Page',
      textAlign: 'right',
    },
    {
      accessor: 'frequency',
      title: '#',
      textAlign: 'right',
    },
    {
      accessor: 'actions',
      title: '',
      textAlign: 'right',
      render: (wordInRow: Word) => {
        const memoizedHandleExcludeWord = useCallback(
          () => handleExcludeWord(wordInRow.id),
          [wordInRow]
        )
        const memoizedHandleUnexcludeWord = useCallback(
          () => handleUnexcludeWord(wordInRow.id),
          [wordInRow]
        )
        const memoizedHandleIgnoredWord = useCallback(
          () => handleIgnoredWord(wordInRow.id),
          [wordInRow]
        )
        const memoizedHandleUnignoredWord = useCallback(
          () => handleUnignoredWord(wordInRow.id),
          [wordInRow]
        )
        const memoizedHandleKnownWord = useCallback(
          () => handleKnownWord(wordInRow.id),
          [wordInRow]
        )
        const memoizedHandleUnknownWord = useCallback(
          () => handleUnknownWord(wordInRow.id),
          [wordInRow]
        )

        return (
          <ActionButtons
            // TODO: show a toast if it doesn't work?
            onExcludeWord={memoizedHandleExcludeWord}
            onUnexcludeWord={memoizedHandleUnexcludeWord}
            onIgnoreWord={memoizedHandleIgnoredWord}
            onUnignoreWord={memoizedHandleUnignoredWord}
            onMarkWordAsKnown={memoizedHandleKnownWord}
            onMarkWordAsUnknown={memoizedHandleUnknownWord}
            isPartOfSeries={isPartOfSeries(seriesOrWork)}
            isSeries={isSeries(seriesOrWork)}
            vocabTableType={type}
            wordInRow={wordInRow}
          />
        )
      },
    },
  ]

  const getAllowedColumns = (type: VocabTableType, listType: ListType) => {
    if (type === VocabTableType.Known || type === VocabTableType.Excluded) {
      return ['reading', 'meaning', 'actions']
    }

    if (
      type === VocabTableType.Recommended ||
      (type === VocabTableType.SeriesOrWork && listType === ListType.Frequency)
    ) {
      return ['reading', 'meaning', 'frequency', 'actions']
    }

    if (
      type === VocabTableType.SeriesOrWork &&
      listType === ListType.Glossary &&
      isWork(seriesOrWork)
    ) {
      return ['reading', 'meaning', 'pageNumber', 'frequency', 'actions']
    }

    return [
      'reading',
      'meaning',
      'volumeNumber',
      'pageNumber',
      'frequency',
      'actions',
    ]
  }

  const selectColumns = (type: VocabTableType, listType: ListType) => {
    const allowedColumns = getAllowedColumns(type, listType)

    return allColumns.filter((column) =>
      allowedColumns.includes(column.accessor)
    )
  }

  const idAccessor = (word: Word) => {
    return `${word.id}-${word.volumeNumber}-${word.pageNumber}-${word.sentenceNumber}-${word.entryNumber}`
  }

  return (
    <div
      className={classes.container}
      style={{ '--max-width': MAX_WIDTH } as React.CSSProperties}
    >
      <SearchFilterSort
        filterContent={
          <VocabFilter
            isSeries={isSeries(seriesOrWork)}
            listType={listType}
            minimumValues={minimumValues}
            setMinimumValues={setMinimumValues}
            setShowIgnoredOptions={setShowIgnoredOptions}
            setShowJlptOptions={setShowJlptOptions}
            showIgnoredOptions={showIgnoredOptions}
            showJlptOptions={showJlptOptions}
            vocabTableType={type}
          />
        }
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        sortContent={
          type === VocabTableType.SeriesOrWork && (
            <VocabSort listType={listType} setListType={setListType} />
          )
        }
      />

      <DataTable
        borderRadius='sm'
        classNames={{ table: classes.table }}
        columns={selectColumns(type, listType)}
        fetching={loading}
        fz='md'
        height='75vh'
        idAccessor={idAccessor}
        noHeader={records.length === 0 ? true : false}
        noRecordsIcon={
          <Box className={classes.noRecordsBox}>
            <IconMoodSad size={36} strokeWidth={1.5} />
          </Box>
        }
        noRecordsText='Nothing to display'
        onScrollToBottom={loadMoreRecords}
        records={records}
        scrollViewportRef={scrollViewportRef}
        striped
        withRowBorders={false}
        withTableBorder
      />
    </div>
  )
}

export const VocabTableMaxWidth = MAX_WIDTH
