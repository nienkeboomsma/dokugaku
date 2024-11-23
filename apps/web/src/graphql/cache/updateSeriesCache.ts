import { ApolloCache } from '@apollo/client'
import type {
  GQL_DeleteSeriesMutation,
  GQL_ReadStatus,
  GQL_UpdateSeriesReadStatusMutation,
} from '@repo/graphql-types'

import { evictFromCache } from '../util/evictFromCache'

export const updateCacheOnSeriesDeletion = (
  cache: ApolloCache<any>,
  data: GQL_DeleteSeriesMutation | null | undefined,
  seriesId: string
) => {
  if (!data?.deleteSeries.success) return

  const itemsToEvict = [
    {
      __typename: 'Series',
      id: seriesId,
    },
  ]

  evictFromCache(cache, itemsToEvict)
}

export const updateCacheOnSeriesStateChange = (
  cache: ApolloCache<any>,
  data: GQL_UpdateSeriesReadStatusMutation | null | undefined,
  seriesId: string,
  status: GQL_ReadStatus
) => {
  if (!data?.updateSeriesReadStatus.success) return

  cache.modify({
    id: cache.identify({
      __typename: 'Series',
      id: seriesId,
    }),
    fields: {
      status() {
        return status
      },
    },
  })
}
