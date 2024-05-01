'use client'

import { useEffect, useState } from 'react'
import { Box } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { IconMoodSad } from '@tabler/icons-react'
import { DataTable, DataTableColumn } from 'mantine-datatable'

import classes from './VocabTable.module.css'
import { type SeriesInfo } from '../../types/SeriesInfo'
import { type Word } from '../../types/Word'
import { type WorkInfo } from '../../types/WorkInfo'
import Reading from './Reading'
import Meaning from './Meaning'
import ActionButtons from './ActionButtons'
import SearchFilterSort from '../SearchFilterSort/SearchFilterSort'
import VocabFilter from './VocabFilter'
import filterVocab from './filterVocab'
import VocabSort, { ListType } from './VocabSort'

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

type TableProperties = {
  columns: DataTableColumn<Word>[]
  filter: boolean
  sort: boolean
}

// eslint-disable-next-line no-unused-vars
export type VocabAction = (id: Word['id']) => void

export default function VocabTable(props: VocabTableProps) {
  const { furigana, type } = props
  const seriesOrWork =
    type === VocabTableType.SeriesOrWork ? props.seriesOrWork : undefined
  const isSeries = seriesOrWork?.series
  const isPartOfSeries = !isSeries ? seriesOrWork?.seriesId : false

  const [vocab, setVocab] = useState<Word[]>([])
  const [records, setRecords] = useState(vocab)
  const [searchValue, setSearchValue] = useState('')
  const [debouncedSearchValue] = useDebouncedValue(searchValue, 500)
  // TODO: save these preferences somewhere
  const [showIgnored, setShowIgnored] = useState(false)
  const [showUnignored, setShowUnignored] = useState(true)
  const [minFrequency, setMinFrequency] = useState<string | number>(3)
  const [debouncedMinFrequency] = useDebouncedValue(minFrequency, 300)
  const [listType, setListType] = useState<ListType>(ListType.Frequency)

  useEffect(() => {
    setRecords(
      vocab.filter((word) =>
        filterVocab({
          minFrequency: debouncedMinFrequency,
          searchValue: debouncedSearchValue,
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
    debouncedSearchValue,
    listType,
    showIgnored,
  ])

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
          onExcludeWord: () => {
            // call to API
            setVocab((prev) =>
              prev.filter((wordInState) => wordInState.id === wordInRow.id)
            )
          },
          onIgnoreWord: () => {
            // call to API
            setVocab((prev) =>
              prev.map((wordInState) =>
                wordInState.id === wordInRow.id
                  ? { ...wordInState, ignored: true }
                  : wordInState
              )
            )
          },
          onMarkWordAsKnown: () => {
            // call to API
            setVocab((prev) =>
              prev.filter((wordInState) => wordInState.id === wordInRow.id)
            )
          },
          onMarkWordAsUnknown: () => {
            // call to API
            setVocab((prev) =>
              prev.filter((wordInState) => wordInState.id === wordInRow.id)
            )
          },
          onUnexcludeWord: () => {
            // call to API
            setVocab((prev) =>
              prev.filter((wordInState) => wordInState.id === wordInRow.id)
            )
          },
          onUnignoreWord: () => {
            // call to API
            setVocab((prev) =>
              prev.map((wordInState) =>
                wordInState.id === wordInRow.id
                  ? { ...wordInState, ignored: false }
                  : wordInState
              )
            )
          },
          isSeries,
          vocabTableType: type,
          wordInRow,
        }),
    },
  ]

  const nonFrequencyColumns = allColumns.filter(
    (column) => column.accessor !== 'frequency'
  )

  const tableProperties: Record<VocabTableType, TableProperties> = {
    [VocabTableType.SeriesOrWork]: {
      columns: allColumns,
      filter: true,
      sort: true,
    },
    [VocabTableType.Recommended]: {
      columns: allColumns,
      // TODO: don't pass a bool, but pass the component of choice?
      filter: true,
      sort: false,
    },
    [VocabTableType.Known]: {
      columns: nonFrequencyColumns,
      filter: false,
      sort: false,
    },
    [VocabTableType.Excluded]: {
      columns: nonFrequencyColumns,
      filter: false,
      sort: false,
    },
  }

  return (
    <div
      className={classes.container}
      style={{ '--max-width': MAX_WIDTH } as React.CSSProperties}
    >
      <SearchFilterSort
        filterContent={
          tableProperties[type].filter && (
            <VocabFilter
              minFrequency={minFrequency}
              setMinFrequency={setMinFrequency}
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
          tableProperties[type].sort && (
            <VocabSort listType={listType} setListType={setListType} />
          )
        }
      />

      <DataTable
        borderRadius='sm'
        classNames={{ table: classes.table }}
        columns={tableProperties[type].columns}
        fz='md'
        minHeight={160}
        noHeader={records.length === 0 ? true : false}
        noRecordsIcon={
          <Box className={classes.noRecordsBox}>
            <IconMoodSad size={36} strokeWidth={1.5} />
          </Box>
        }
        noRecordsText='Nothing to display'
        records={records}
        striped
        withRowBorders={false}
        withTableBorder
      />
    </div>
  )
}

export const VocabTableMaxWidth = MAX_WIDTH
