import { useMutation } from '@apollo/client'
import type {
  GQL_UpdateExcludedStatusMutation,
  GQL_UpdateIgnoredStatusMutation,
  GQL_UpdateKnownStatusMutation,
} from '@repo/graphql-types'

import type { SeriesInfo } from '../types/SeriesInfo'
import type { WorkInfo } from '../types/WorkInfo'
import {
  UPDATE_EXCLUDED_STATUS,
  UPDATE_IGNORED_STATUS,
  UPDATE_KNOWN_STATUS,
} from '../graphql/queries/vocabTableQueries'
import {
  updateCacheOnExcluded,
  updateCacheOnIgnored,
  updateCacheOnKnown,
  updateCacheOnUnexcluded,
  updateCacheOnUnignored,
  updateCacheOnUnknown,
} from '../graphql/cache/updateVocabCache'

export const useUpdateWordsMutation = (
  seriesOrWork?: SeriesInfo | WorkInfo
) => {
  const [updateExcludedStatus] = useMutation<GQL_UpdateExcludedStatusMutation>(
    UPDATE_EXCLUDED_STATUS
  )
  const [updateIgnoredStatus] = useMutation<GQL_UpdateIgnoredStatusMutation>(
    UPDATE_IGNORED_STATUS
  )
  const [updateKnownStatus] =
    useMutation<GQL_UpdateKnownStatusMutation>(UPDATE_KNOWN_STATUS)

  const seriesOrWorkIdInWhichIgnored = () => {
    const isSeries = seriesOrWork?.series
    const isPartOfSeries = !isSeries && !!seriesOrWork?.seriesId

    if (isSeries) {
      return { seriesIdInWhichIgnored: seriesOrWork.id }
    }

    if (!isSeries && isPartOfSeries) {
      return { seriesIdInWhichIgnored: seriesOrWork.seriesId }
    }

    if (!isSeries && !isPartOfSeries) {
      return {
        workIdInWhichIgnored: seriesOrWork?.id,
      }
    }
  }

  const handleExcludeWord = (wordId: string) => {
    updateExcludedStatus({
      variables: { input: { id: wordId, excluded: true } },
      update: (cache, { data }) => updateCacheOnExcluded(cache, data, wordId),
    })
  }

  const handleUnexcludeWord = (wordId: string) => {
    updateExcludedStatus({
      variables: { input: { id: wordId, excluded: false } },
      update: (cache, { data }) => updateCacheOnUnexcluded(cache, data, wordId),
    })
  }

  const handleIgnoredWord = (wordId: string) => {
    updateIgnoredStatus({
      variables: {
        input: {
          id: wordId,
          ignored: true,
          ...seriesOrWorkIdInWhichIgnored(),
        },
      },
      update: (cache, { data }) => updateCacheOnIgnored(cache, data, wordId),
    })
  }

  const handleUnignoredWord = (wordId: string) => {
    updateIgnoredStatus({
      variables: {
        input: {
          id: wordId,
          ignored: false,
          ...seriesOrWorkIdInWhichIgnored(),
        },
      },
      update: (cache, { data }) => updateCacheOnUnignored(cache, data, wordId),
    })
  }

  const handleKnownWord = (wordId: string) => {
    updateKnownStatus({
      variables: { input: { id: wordId, known: true } },
      update: (cache, { data }) => updateCacheOnKnown(cache, data, wordId),
    })
  }

  const handleUnknownWord = (wordId: string) => {
    updateKnownStatus({
      variables: { input: { id: wordId, known: false } },
      update: (cache, { data }) => updateCacheOnUnknown(cache, data, wordId),
    })
  }

  return {
    handleExcludeWord,
    handleUnexcludeWord,
    handleIgnoredWord,
    handleUnignoredWord,
    handleKnownWord,
    handleUnknownWord,
  }
}
