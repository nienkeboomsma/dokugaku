import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc'

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      // TODO: do this via env variable
      uri: 'http://graphql:3001',
    }),
  })
})
