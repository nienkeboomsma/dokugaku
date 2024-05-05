import { ApolloCache } from '@apollo/client'
import type {
  GQL_UpdateExcludedStatusMutation,
  GQL_UpdateIgnoredStatusMutation,
  GQL_UpdateKnownStatusMutation,
} from '@repo/graphql-types'

import { evictFromCache } from '../util/evictFromCache'

export const updateCacheOnExcluded = (
  cache: ApolloCache<any>,
  data: GQL_UpdateExcludedStatusMutation | null | undefined,
  wordId: string
) => {
  if (!data?.updateExcludedStatus.success) return

  const itemsToEvict = [
    {
      __typename: 'FrequencyListWord',
      id: wordId,
    },
    {
      __typename: 'RecommendedWord',
      id: wordId,
    },
    {
      id: 'ROOT_QUERY',
      fieldName: 'glossary',
    },
  ]

  evictFromCache(cache, itemsToEvict)
}

export const updateCacheOnUnexcluded = (
  cache: ApolloCache<any>,
  data: GQL_UpdateExcludedStatusMutation | null | undefined,
  wordId: string
) => {
  if (!data?.updateExcludedStatus.success) return

  const itemsToEvict = [
    {
      __typename: 'ExcludedWord',
      id: wordId,
    },
    {
      id: 'ROOT_QUERY',
      fieldName: 'recommendedWords',
    },
    {
      id: 'ROOT_QUERY',
      fieldName: 'frequencyList',
    },
    {
      id: 'ROOT_QUERY',
      fieldName: 'glossary',
    },
  ]

  evictFromCache(cache, itemsToEvict)
}

export const updateCacheOnKnown = (
  cache: ApolloCache<any>,
  data: GQL_UpdateKnownStatusMutation | null | undefined,
  wordId: string
) => {
  if (!data?.updateKnownStatus.success) return

  const itemsToEvict = [
    {
      __typename: 'FrequencyListWord',
      id: wordId,
    },
    {
      __typename: 'RecommendedWord',
      id: wordId,
    },
    {
      id: 'ROOT_QUERY',
      fieldName: 'glossary',
    },
  ]

  evictFromCache(cache, itemsToEvict)
}

export const updateCacheOnUnknown = (
  cache: ApolloCache<any>,
  data: GQL_UpdateKnownStatusMutation | null | undefined,
  wordId: string
) => {
  if (!data?.updateKnownStatus.success) return

  const itemsToEvict = [
    {
      __typename: 'KnownWord',
      id: wordId,
    },
    {
      id: 'ROOT_QUERY',
      fieldName: 'recommendedWords',
    },
    {
      id: 'ROOT_QUERY',
      fieldName: 'frequencyList',
    },
    {
      id: 'ROOT_QUERY',
      fieldName: 'glossary',
    },
  ]

  evictFromCache(cache, itemsToEvict)
}

export const updateCacheOnIgnored = (
  cache: ApolloCache<any>,
  data: GQL_UpdateIgnoredStatusMutation | null | undefined,
  wordId: string
) => {
  if (!data?.updateIgnoredStatus.success) return

  cache.modify({
    id: cache.identify({
      __typename: 'FrequencyListWord',
      id: wordId,
    }),
    fields: {
      ignored() {
        return true
      },
    },
    broadcast: false,
  })

  const itemsToEvict = [
    // TODO: once ignored words are discounted in recommendedWords, turn this back on
    // {
    //   id: 'ROOT_QUERY',
    //   fieldName: 'recommendedWords',
    // },
    {
      id: 'ROOT_QUERY',
      fieldName: 'glossary',
    },
  ]

  evictFromCache(cache, itemsToEvict)
}

export const updateCacheOnUnignored = (
  cache: ApolloCache<any>,
  data: GQL_UpdateIgnoredStatusMutation | null | undefined,
  wordId: string
) => {
  if (!data?.updateIgnoredStatus.success) return

  cache.modify({
    id: cache.identify({
      __typename: 'FrequencyListWord',
      id: wordId,
    }),
    fields: {
      ignored() {
        return false
      },
    },
    broadcast: false,
  })

  const itemsToEvict = [
    // TODO: once ignored words are discounted in recommendedWords, turn this back on
    // {
    //   id: 'ROOT_QUERY',
    //   fieldName: 'recommendedWords',
    // },
    {
      id: 'ROOT_QUERY',
      fieldName: 'glossary',
    },
  ]

  evictFromCache(cache, itemsToEvict)
}
