import { gql, useQuery } from '@apollo/client'
import { ListType } from '../components/VocabTable/VocabSort'
import { VocabTableType } from '../components/VocabTable/VocabTable'
import {
  GQL_CorpusScopedInput,
  GQL_ExcludedWordsQuery,
  GQL_FrequencyListInput,
  GQL_FrequencyListQuery,
  GQL_GlossaryInput,
  GQL_GlossaryQuery,
  GQL_KnownWordsQuery,
  GQL_RecommendedWordsQuery,
} from '@repo/graphql-types'

export const EXCLUDED_WORDS = gql`
  query ExcludedWords($input: CorpusScopedInput) {
    excludedWords(input: $input) {
      id
      info
    }
  }
`

export const FREQUENCY_LIST = gql`
  query FrequencyList($input: FrequencyListInput!) {
    frequencyList(input: $input) {
      id
      info
      frequency
      ignored
    }
  }
`

export const GLOSSARY = gql`
  query Glossary($input: GlossaryInput!) {
    glossary(input: $input) {
      id
      info
      frequency
      ignored
      volumeNumber
      pageNumber
      sentenceNumber
      entryNumber
      componentNumber
    }
  }
`

export const KNOWN_WORDS = gql`
  query KnownWords($input: CorpusScopedInput) {
    knownWords(input: $input) {
      id
      info
    }
  }
`

export const RECOMMENDED_WORDS = gql`
  query RecommendedWords($input: CorpusScopedInput) {
    recommendedWords(input: $input) {
      id
      info
      frequency
    }
  }
`

export const useGetWordsQuery = (
  listType: ListType,
  type: VocabTableType,
  variables: GQL_CorpusScopedInput & GQL_FrequencyListInput & GQL_GlossaryInput
) => {
  if (type === VocabTableType.Excluded) {
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
      console.log('Getting next batch of words with offset', nextOffset)
      fetchMore({
        variables: {
          input: { limit: variables.limit, offset: nextOffset },
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          console.log('previous data:', prev)
          console.log('newly fetched data:', fetchMoreResult)
          const newExcludedWords = prev.excludedWords.concat(
            fetchMoreResult.excludedWords
          )
          console.log('new excluded words:', newExcludedWords)
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
  if (type === VocabTableType.Known) {
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
      console.log('Getting next batch of words with offset', nextOffset)
      fetchMore({
        variables: {
          input: { limit: variables.limit, offset: nextOffset },
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          console.log('previous data:', prev)
          console.log('newly fetched data:', fetchMoreResult)
          const newKnownWords = prev.knownWords.concat(
            fetchMoreResult.knownWords
          )
          console.log('new known words:', newKnownWords)
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

  if (type === VocabTableType.Recommended) {
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
      console.log('Getting next batch of words with offset', nextOffset)
      fetchMore({
        variables: {
          input: { limit: variables.limit, offset: nextOffset },
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          console.log('previous data:', prev)
          console.log('newly fetched data:', fetchMoreResult)
          const newRecommendedWords = prev.recommendedWords.concat(
            fetchMoreResult.recommendedWords
          )
          console.log('new recommended words:', newRecommendedWords)
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

  if (type === VocabTableType.SeriesOrWork) {
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
        console.log('Getting next batch of words with offset', nextOffset)
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
            console.log('previous data:', prev)
            console.log('newly fetched data:', fetchMoreResult)
            const newFrequencyList = prev.frequencyList.concat(
              fetchMoreResult.frequencyList
            )
            console.log('new frequency list:', newFrequencyList)
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
        console.log('Getting next batch of words with offset', nextOffset)
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
            console.log('previous data:', prev)
            console.log('newly fetched data:', fetchMoreResult)
            const newGlossary = prev.glossary.concat(fetchMoreResult.glossary)
            console.log('new glossary:', newGlossary)
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
  }
}
