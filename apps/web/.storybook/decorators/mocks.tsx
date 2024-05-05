import React from 'react'
import { MockedProvider } from '@apollo/react-testing'
import { DocumentNode, InMemoryCache } from '@apollo/client'

import { cache } from '../../src/graphql/cache/cache'

type Data = {
  [property: string]: any
}

type Mock = {
  request: {
    query: DocumentNode
  }
  variableMatcher: () => boolean
  result: {
    data: {
      [queryName: string]: Data
    }
  }
  maxUsageCount?: number
}

const mockCache = new InMemoryCache(cache)

export function ApolloMockedProvider(mocks: Mock[]) {
  return (Story: () => React.ReactNode) => (
    // @ts-ignore (no idea how to fix this; it seems to work fine)
    <MockedProvider mocks={mocks} cache={mockCache}>
      <Story />
    </MockedProvider>
  )
}
