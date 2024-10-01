'use client'

import { ApolloLink, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr'

import getHost from '../../util/getHost'
import { cache } from '../cache/cache'

const isServer = () => typeof window === `undefined`

const getGraphQLHost = () => {
  if (isServer()) return 'graphql'
  return getHost()
}

export function makeClient() {
  const host = getGraphQLHost()
  const port = process.env.NEXT_PUBLIC_GRAPHQL_PORT
  const adjustedUri = `http://${host}:${port}`

  const httpLink = createHttpLink({
    uri: adjustedUri,
  })

  const authLink = setContext((_, { headers }) => {
    // TODO: env variable
    const token = '6e41e9fd-c813-40e9-91fd-c51e47efab42'
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    }
  })

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(cache),
    link: isServer()
      ? ApolloLink.from([
          new SSRMultipartLink({
            stripDefer: true,
          }),
          authLink.concat(httpLink),
        ])
      : authLink.concat(httpLink),
    ssrMode: isServer(),
    connectToDevTools: true,
  })
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  )
}
