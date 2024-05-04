import { type ApolloCache } from '@apollo/client'

type ItemToEvict =
  | { __typename: string; id: string }
  | { id?: string; fieldName: string }

export const evictFromCache = (
  cache: ApolloCache<any>,
  itemsToEvict: ItemToEvict[]
) => {
  for (const item of itemsToEvict) {
    if ('__typename' in item) {
      cache.evict({ id: cache.identify(item) })
    }

    if ('fieldName' in item) {
      cache.evict(item)
    }
  }

  cache.gc()
}
