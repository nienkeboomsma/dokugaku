import { useQuery } from '@apollo/client'
import type {
  GQL_ExcludedWordsQuery,
  GQL_FrequencyListQuery,
  GQL_GlossaryQuery,
  GQL_KnownWordsQuery,
  GQL_RecommendedWordsQuery,
} from '@repo/graphql-types'

import { VocabTableType } from '../components/VocabTable/VocabTable'
import { ListType } from '../components/VocabTable/VocabSort'
import {
  EXCLUDED_WORDS,
  FREQUENCY_LIST,
  GLOSSARY,
  KNOWN_WORDS,
  RECOMMENDED_WORDS,
} from '../graphql/vocabTableQueries'

type Variables = {
  isPartOfSeries: boolean
  isSeries?: boolean
  limit: number
  offset: number
  seriesId?: string
  workId?: string
}

export const useGetWordsQuery = (
  listType: ListType,
  kind: VocabTableType,
  variables: Variables
) => {
  if (kind === VocabTableType.Excluded) {
    const { data, error, fetchMore, loading } =
      useQuery<GQL_ExcludedWordsQuery>(EXCLUDED_WORDS, {
        notifyOnNetworkStatusChange: true,
        variables: {
          input: {
            limit: variables.limit,
            offset: variables.offset,
          },
        },
      })

    const getNextBatchOfWords = (nextOffset: number) => {
      fetchMore({
        variables: {
          input: { limit: variables.limit, offset: nextOffset },
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          const newExcludedWords = prev.excludedWords.concat(
            fetchMoreResult.excludedWords
          )

          return {
            ...prev,
            excludedWords: newExcludedWords,
          }
        },
      })
    }

    return {
      data: data?.excludedWords,
      error,
      getNextBatchOfWords,
      loading,
    }
  }

  if (kind === VocabTableType.Known) {
    const { data, error, fetchMore, loading } = useQuery<GQL_KnownWordsQuery>(
      KNOWN_WORDS,
      {
        notifyOnNetworkStatusChange: true,
        variables: {
          input: {
            limit: variables.limit,
            offset: variables.offset,
          },
        },
      }
    )

    const getNextBatchOfWords = (nextOffset: number) => {
      fetchMore({
        variables: {
          input: { limit: variables.limit, offset: nextOffset },
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          const newKnownWords = prev.knownWords.concat(
            fetchMoreResult.knownWords
          )

          return {
            ...prev,
            knownWords: newKnownWords,
          }
        },
      })
    }

    return {
      data: data?.knownWords,
      error,
      getNextBatchOfWords,
      loading,
    }
  }

  if (kind === VocabTableType.Recommended) {
    const { data, error, fetchMore, loading } =
      useQuery<GQL_RecommendedWordsQuery>(RECOMMENDED_WORDS, {
        notifyOnNetworkStatusChange: true,
        variables: {
          input: {
            limit: variables.limit,
            offset: variables.offset,
          },
        },
        onCompleted: () => {},
      })

    const getNextBatchOfWords = (nextOffset: number) => {
      fetchMore({
        variables: {
          input: { limit: variables.limit, offset: nextOffset },
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          const newRecommendedWords = prev.recommendedWords.concat(
            fetchMoreResult.recommendedWords
          )

          return {
            ...prev,
            recommendedWords: newRecommendedWords,
          }
        },
      })
    }

    return {
      data: data?.recommendedWords,
      error,
      getNextBatchOfWords,
      loading,
    }
  }

  if (kind === VocabTableType.SeriesOrWork) {
    if (listType === ListType.Frequency) {
      const { data, error, fetchMore, loading } =
        useQuery<GQL_FrequencyListQuery>(FREQUENCY_LIST, {
          notifyOnNetworkStatusChange: true,
          variables: {
            input: {
              isPartOfSeries: variables.isPartOfSeries,
              isSeries: variables.isSeries,
              limit: variables.limit,
              offset: variables.offset,
              seriesId: variables.seriesId,
              workId: variables.workId,
            },
          },
        })

      const getNextBatchOfWords = (nextOffset: number) => {
        fetchMore({
          variables: {
            input: {
              isPartOfSeries: variables.isPartOfSeries,
              isSeries: variables.isSeries,
              limit: variables.limit,
              offset: nextOffset,
              seriesId: variables.seriesId,
              workId: variables.workId,
            },
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            const newFrequencyList = prev.frequencyList.concat(
              fetchMoreResult.frequencyList
            )

            return {
              ...prev,
              frequencyList: newFrequencyList,
            }
          },
        })
      }

      return {
        data: data?.frequencyList,
        error,
        getNextBatchOfWords,
        loading,
      }
    }

    if (listType === ListType.Glossary) {
      const { data, error, fetchMore, loading } = useQuery<GQL_GlossaryQuery>(
        GLOSSARY,
        {
          notifyOnNetworkStatusChange: true,
          variables: {
            input: {
              isPartOfSeries: variables.isPartOfSeries,
              limit: variables.limit,
              offset: variables.offset,
              seriesId: variables.seriesId,
              workId: variables.workId,
            },
          },
        }
      )

      const getNextBatchOfWords = (nextOffset: number) => {
        fetchMore({
          variables: {
            input: {
              isPartOfSeries: variables.isPartOfSeries,
              limit: variables.limit,
              offset: nextOffset,
              seriesId: variables.seriesId,
              workId: variables.workId,
            },
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            const newGlossary = prev.glossary.concat(fetchMoreResult.glossary)

            return {
              ...prev,
              glossary: newGlossary,
            }
          },
        })
      }

      return {
        data: data?.glossary,
        error,
        getNextBatchOfWords,
        loading,
      }
    }

    return listType satisfies never
  }

  return kind satisfies never
}
