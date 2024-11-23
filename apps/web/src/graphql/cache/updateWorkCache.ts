import { ApolloCache } from '@apollo/client'
import type {
  GQL_DeleteWorkMutation,
  GQL_ReadStatus,
  GQL_UpdateWorkProgressMutation,
  GQL_UpdateWorkReadStatusMutation,
} from '@repo/graphql-types'

import { evictFromCache } from '../util/evictFromCache'

export const updateCacheOnWorkDeletion = (
  cache: ApolloCache<any>,
  data: GQL_DeleteWorkMutation | null | undefined,
  workId: string
) => {
  if (!data?.deleteWork.success) return

  const itemsToEvict = [
    {
      __typename: 'Work',
      id: workId,
    },
  ]

  evictFromCache(cache, itemsToEvict)
}

export const updateCacheOnWorkProgressChange = (
  cache: ApolloCache<any>,
  data: GQL_UpdateWorkProgressMutation | null | undefined,
  workId: string,
  progress: number
) => {
  if (!data?.updateWorkProgress.success) return

  cache.modify({
    id: cache.identify({
      __typename: 'Work',
      id: workId,
    }),
    fields: {
      progress() {
        return progress
      },
    },
  })
}

export const updateCacheOnWorkStateChange = (
  cache: ApolloCache<any>,
  data: GQL_UpdateWorkReadStatusMutation | null | undefined,
  workId: string,
  status: GQL_ReadStatus
) => {
  if (!data?.updateWorkReadStatus.success) return

  cache.modify({
    id: cache.identify({
      __typename: 'Work',
      id: workId,
    }),
    fields: {
      status() {
        return status
      },
    },
  })
}
