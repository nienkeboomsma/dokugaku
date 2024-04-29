'use client'

import { useEffect, useState } from 'react'
import { Box } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { IconMoodSad } from '@tabler/icons-react'
import { DataTable, DataTableColumn } from 'mantine-datatable'

import classes from './VocabTable.module.css'
import { type Word } from '../../types/Word'
import SearchFilterSort from '../SearchFilterSort/SearchFilterSort'
import Reading from './Reading'
import Meaning from './Meaning'
import ActionButtons from './ActionButtons'
import filterVocab from './filterVocab'
import sortVocab from './sortVocab'
import VocabFilter from './VocabFilter'
import VocabSort from './VocabSort'

const MAX_WIDTH = '52rem'

export type VocabTableType =
  | 'frequencyList'
  | 'recommendedVocab'
  | 'knownWords'
  | 'excludedFromWork'
  | 'excludedEverywhere'

// eslint-disable-next-line no-unused-vars
export type VocabAction = (id: Word['id']) => void

export type VocabTableProps = {
  actions: {
    onExcludeWord: VocabAction
    onIgnoreWord: VocabAction
    onMarkWordAsKnown: VocabAction
    onMarkWordAsUnknown: VocabAction
    onUnexcludeWord: VocabAction
    onUnignoreWord: VocabAction
  }
  furigana?: boolean
  type: VocabTableType
  vocab: Word[]
}

type TableProperties = {
  columns: DataTableColumn<Word>[]
  filter: boolean
  sort: boolean
}

export default function VocabTable({
  actions,
  furigana,
  type,
  vocab,
}: VocabTableProps) {
  const [records, setRecords] = useState(vocab)
  const [searchValue, setSearchValue] = useState('')
  const [debouncedSearchValue] = useDebouncedValue(searchValue, 500)
  // TODO: save these preferences somewhere
  const [minFrequency, setMinFrequency] = useState<string | number>(3)
  const [sortOrder, setSortOrder] = useState<'frequency' | 'firstOccurrence'>(
    'frequency'
  )

  useEffect(() => {
    setRecords(
      vocab
        .filter((vocab) =>
          filterVocab(vocab, type, debouncedSearchValue, minFrequency)
        )
        .sort((vocabA, vocabB) => sortVocab(vocabA, vocabB, sortOrder))
    )
  }, [vocab, debouncedSearchValue, minFrequency, sortOrder])

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
      render: (vocab: Word) =>
        ActionButtons({
          onExcludeWord: () => actions.onExcludeWord(vocab.id),
          onIgnoreWord: () => actions.onIgnoreWord(vocab.id),
          onMarkWordAsKnown: () => actions.onMarkWordAsKnown(vocab.id),
          onMarkWordAsUnknown: () => actions.onMarkWordAsUnknown(vocab.id),
          onUnexcludeWord: () => actions.onUnexcludeWord(vocab.id),
          onUnignoreWord: () => actions.onUnignoreWord(vocab.id),
          type: type,
        }),
    },
  ]

  const nonFrequencyColumns = allColumns.filter(
    (column) => column.accessor !== 'frequency'
  )

  const tableProperties: Record<VocabTableType, TableProperties> = {
    frequencyList: {
      columns: allColumns,
      filter: true,
      sort: true,
    },
    recommendedVocab: {
      columns: allColumns,
      filter: true,
      sort: false,
    },
    knownWords: {
      columns: nonFrequencyColumns,
      filter: false,
      sort: false,
    },
    excludedFromWork: {
      columns: nonFrequencyColumns,
      filter: false,
      sort: true,
    },
    excludedEverywhere: {
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
            />
          )
        }
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        sortContent={
          tableProperties[type].sort && (
            <VocabSort sortOrder={sortOrder} setSortOrder={setSortOrder} />
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
