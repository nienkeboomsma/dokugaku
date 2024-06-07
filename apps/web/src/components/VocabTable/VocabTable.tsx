/* eslint-disable no-unused-vars */
'use client'

import { useEffect, useRef, useState } from 'react'
import { Box, List } from '@mantine/core'
import { useDebouncedValue, useLocalStorage } from '@mantine/hooks'
import { IconMoodSad } from '@tabler/icons-react'
import { DataTable, DataTableColumn } from 'mantine-datatable'

import classes from './VocabTable.module.css'
import { type SeriesInfo } from '../../types/SeriesInfo'
import { type Word } from '../../types/Word'
import { type WorkInfo } from '../../types/WorkInfo'
import { useGetWordsQuery } from '../../hooks/useGetWordsQuery'
import { useUpdateWordsMutation } from '../../hooks/useUpdateWordsMutation'
import Reading from './Reading'
import Meaning from './Meaning'
import ActionButtons from './ActionButtons'
import SearchFilterSort from '../SearchFilterSort/SearchFilterSort'
import VocabFilter from './VocabFilter'
import filterVocab from './filterVocab'
import VocabSort, { ListType } from './VocabSort'

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
  progress?: number
  seriesOrWork: SeriesInfo | WorkInfo
  type: VocabTableType.SeriesOrWork
}

const isSeries = (
  seriesOrWork: SeriesInfo | WorkInfo | undefined
): seriesOrWork is SeriesInfo => {
  if (!seriesOrWork) return false
  return seriesOrWork?.isSeries
}

const isWork = (
  seriesOrWork: SeriesInfo | WorkInfo | undefined
): seriesOrWork is WorkInfo => {
  if (!seriesOrWork) return false
  return !isSeries(seriesOrWork)
}

export type VocabTableProps =
  | VocabTablePropsCorpus
  | VocabTablePropsSeriesOrWork

export default function VocabTable(props: VocabTableProps) {
  const { furigana, type } = props
  const seriesOrWork =
    type === VocabTableType.SeriesOrWork ? props.seriesOrWork : undefined
  const isPartOfSeries = isWork(seriesOrWork) && !!seriesOrWork?.seriesId

  const [showIgnored, setShowIgnored] = useLocalStorage({
    defaultValue: false,
    key: 'DOKUGAKU_SHOW_IGNORED',
  })
  const [showUnignored, setShowUnignored] = useLocalStorage({
    defaultValue: true,
    key: 'DOKUGAKU_SHOW_UNIGNORED',
  })
  const [minFrequency, setMinFrequency] = useLocalStorage<string | number>({
    defaultValue: 1,
    key: 'DOKUGAKU_MINIMUM_FREQUENCY',
  })
  const [debouncedMinFrequency] = useDebouncedValue(minFrequency, 300)
  const [minPageNumber, setMinPageNumber] = useState<string | number>(
    isWork(seriesOrWork) ? seriesOrWork.progress + 1 : 1
  )
  const [debouncedMinPageNumber] = useDebouncedValue(Number(minPageNumber), 300)
  const [listType, setListType] = useLocalStorage({
    defaultValue: ListType.Frequency,
    key: `DOKUGAKU_LIST_TYPE-${seriesOrWork?.id}`,
  })
  const [searchValue, setSearchValue] = useState('')
  const [debouncedSearchValue] = useDebouncedValue(searchValue, 500)

  const scrollViewportRef = useRef<HTMLDivElement>(null)
  const [vocab, setVocab] = useState<Word[]>([])
  const [records, setRecords] = useState(vocab)

  const queryVariables = {
    isPartOfSeries,
    isSeries: isSeries(seriesOrWork),
    limit: BATCH_SIZE,
    offset: 0,
    seriesId: isSeries(seriesOrWork) ? seriesOrWork.id : seriesOrWork?.seriesId,
    workId: isWork(seriesOrWork) ? seriesOrWork?.id : undefined,
  }

  const { data, getNextBatchOfWords, loading } = useGetWordsQuery(
    listType,
    type,
    queryVariables,
    debouncedSearchValue,
    debouncedMinPageNumber
  )

  const loadMoreRecords = () => {
    // TODO: loadMoreRecords continues to be triggered (and to show a spinner)
    //       even if there are no more records to fetch
    // TODO: if minFrequency = 3 (for example) and the last row where
    //       minFrequency = 3 has been downloaded, loadMoreRecords should not
    //       trigger anymore, even though there are more records it could fetch
    // ----> maybe fetch BATCH_SIZE + 1 rows, using that last row to determine
    //       the required info without forwarding it to the frontend?
    getNextBatchOfWords(vocab.length)
  }

  useEffect(() => {
    setRecords([])
  }, [debouncedMinPageNumber, debouncedSearchValue, listType])

  useEffect(() => {
    setVocab(data ?? [])
  }, [data])

  useEffect(() => {
    setRecords(
      vocab.filter((word) =>
        filterVocab({
          minFrequency: debouncedMinFrequency,
          showIgnored,
          showUnignored,
          type,
          word,
        })
      )
    )
  }, [
    vocab,
    debouncedMinFrequency,
    debouncedMinPageNumber,
    showIgnored,
    showUnignored,
  ])

  const {
    handleExcludeWord,
    handleUnexcludeWord,
    handleIgnoredWord,
    handleUnignoredWord,
    handleKnownWord,
    handleUnknownWord,
  } = useUpdateWordsMutation(seriesOrWork)

  // TODO: see if a fixed width for reading/frequency/actions makes sense
  const allColumns: DataTableColumn<Word>[] = [
    {
      accessor: 'reading',
      noWrap: true,
      render: (vocab: Word) => Reading({ vocab, furigana }),
    },
    {
      accessor: 'meaning',
      render: (vocab: Word) => Meaning({ vocab }),
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
      render: (wordInRow: Word) =>
        ActionButtons({
          // TODO: show a toast if it doesn't work?
          onExcludeWord: () => handleExcludeWord(wordInRow.id),
          onUnexcludeWord: () => handleUnexcludeWord(wordInRow.id),
          onIgnoreWord: () => handleIgnoredWord(wordInRow.id),
          onUnignoreWord: () => handleUnignoredWord(wordInRow.id),
          onMarkWordAsKnown: () => handleKnownWord(wordInRow.id),
          onMarkWordAsUnknown: () => handleUnknownWord(wordInRow.id),
          isPartOfSeries,
          isSeries: isSeries(seriesOrWork),
          vocabTableType: type,
          wordInRow,
        }),
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

    return ['reading', 'meaning', 'pageNumber', 'frequency', 'actions']
  }

  const selectColumns = (type: VocabTableType, listType: ListType) => {
    const allowedColumns = getAllowedColumns(type, listType)

    return allColumns.filter((column) =>
      allowedColumns.includes(column.accessor)
    )
  }

  const idAccessor = (word: Word) => {
    if (word.pageNumber && word.sentenceNumber && word.entryNumber) {
      return `${word.id}-${word.pageNumber}-${word.sentenceNumber}-${word.entryNumber}`
    }

    return word.id
  }

  return (
    <div
      className={classes.container}
      style={{ '--max-width': MAX_WIDTH } as React.CSSProperties}
    >
      <SearchFilterSort
        filterContent={
          (type === VocabTableType.SeriesOrWork ||
            type === VocabTableType.Recommended) && (
            <VocabFilter
              listType={listType}
              minFrequency={minFrequency}
              minPageNumber={minPageNumber}
              setMinFrequency={setMinFrequency}
              setMinPageNumber={setMinPageNumber}
              setShowIgnored={setShowIgnored}
              setShowUnignored={setShowUnignored}
              showIgnored={showIgnored}
              showUnignored={showUnignored}
              vocabTableType={type}
            />
          )
        }
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        sortContent={
          type === VocabTableType.SeriesOrWork &&
          isWork(seriesOrWork) && (
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
