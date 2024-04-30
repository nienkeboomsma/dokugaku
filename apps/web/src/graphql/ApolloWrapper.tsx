'use client'

import { ApolloLink, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr'

const isServer = () => typeof window === `undefined`

export function makeClient() {
  const adjustedUri = isServer()
    ? // TODO: do this via env variable
      'http://graphql:3001'
    : 'http://localhost:3001'
  // 'http://host.docker.internal:3001'

  const httpLink = createHttpLink({
    uri: adjustedUri,
  })

  const authLink = setContext((_, { headers }) => {
    // TODO: figure out how to do auth properly
    const token = '6e41e9fd-c813-40e9-91fd-c51e47efab42'
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    }
  })

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: isServer()
      ? ApolloLink.from([
          new SSRMultipartLink({
            stripDefer: true,
          }),
          authLink.concat(httpLink),
        ])
      : authLink.concat(httpLink),
    ssrMode: isServer(),
  })
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  )
}
