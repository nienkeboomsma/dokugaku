import { useEffect, useState } from 'react'
import { useDebouncedValue } from '@mantine/hooks'

import type { VocabTableProps } from '../components/VocabTable/VocabTable'
import { ListType } from '../components/VocabTable/VocabFilter/VocabSort'
import {
  getSeriesOrWork,
  isPartOfSeries,
  isSeries,
  isWork,
} from '../components/VocabTable/utils'
import type { Word } from '../types/Word'
import { useGetWordsQuery } from './useGetWordsQuery'
import filterVocab from '../components/VocabTable/VocabFilter/filterVocab'
import { useUpdateWordsMutation } from './useUpdateWordsMutation'
import type {
  IgnoredOptions,
  JlptOptions,
  MinimumValues,
} from '../components/VocabTable/VocabFilter/VocabFilter'

export default function useVocabTableRequests(
  props: VocabTableProps,
  options: {
    batchSize: number
    minimumValues: MinimumValues
    searchValue: string
    listType: ListType
    showIgnoredOptions: IgnoredOptions
    showJlptOptions: JlptOptions
  }
) {
  const seriesOrWork = getSeriesOrWork(props)

  const [vocab, setVocab] = useState<Word[]>([])
  const [records, setRecords] = useState(vocab)
  const [debouncedMinimumValues] = useDebouncedValue(options.minimumValues, 500)
  const [debouncedSearchValue] = useDebouncedValue(options.searchValue, 500)

  const queryVariables = {
    isPartOfSeries: isPartOfSeries(seriesOrWork),
    isSeries: isSeries(seriesOrWork),
    limit: options.batchSize,
    offset: 0,
    seriesId: isSeries(seriesOrWork) ? seriesOrWork.id : seriesOrWork?.seriesId,
    workId: isWork(seriesOrWork) ? seriesOrWork?.id : undefined,
  }

  const { data, getNextBatchOfWords, loading } = useGetWordsQuery(
    options.listType,
    props.type,
    queryVariables,
    debouncedSearchValue,
    debouncedMinimumValues.page,
    debouncedMinimumValues.volume
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

  // Empty the records in preparation for receiving fresh data
  useEffect(() => {
    setRecords([])
  }, [
    debouncedMinimumValues.page,
    debouncedMinimumValues.volume,
    debouncedSearchValue,
    options.listType,
  ])

  useEffect(() => {
    setVocab(data ?? [])
  }, [data])

  useEffect(() => {
    setRecords(
      vocab.filter((word) =>
        filterVocab({
          minFrequency: debouncedMinimumValues.frequency,
          showIgnoredOptions: options.showIgnoredOptions,
          showJlptOptions: options.showJlptOptions,
          type: props.type,
          word,
        })
      )
    )
  }, [
    vocab,
    debouncedMinimumValues.frequency,
    options.showIgnoredOptions,
    options.showJlptOptions,
  ])

  const {
    handleExcludeWord,
    handleUnexcludeWord,
    handleIgnoredWord,
    handleUnignoredWord,
    handleKnownWord,
    handleUnknownWord,
  } = useUpdateWordsMutation(seriesOrWork)

  return {
    handleExcludeWord,
    handleIgnoredWord,
    handleKnownWord,
    handleUnexcludeWord,
    handleUnignoredWord,
    handleUnknownWord,
    loading,
    loadMoreRecords,
    records,
  }
}
