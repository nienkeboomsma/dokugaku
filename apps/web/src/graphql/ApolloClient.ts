import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { offsetLimitPagination } from '@apollo/client/utilities'
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc'

export const { getClient } = registerApolloClient(() => {
  const httpLink = createHttpLink({
    // uri: 'http://graphql:3001',
    uri: 'http://localhost:3001',
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

  return new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            excludedWords: offsetLimitPagination(),
            frequencyList: offsetLimitPagination(['seriedId', 'workId']),
            glossary: offsetLimitPagination(['seriedId', 'workId']),
            knownWords: offsetLimitPagination(),
            recommendedWords: offsetLimitPagination(),
          },
        },
        // The 'id' property is not a unique identifier, as each distinct word
        // can occur more than once within a glossary.
        GlossaryWord: {
          keyFields: [
            'volumeNumber',
            'pageNumber',
            'sentenceNumber',
            'entryNumber',
            'componentNumber',
          ],
        },
      },
    }),
    link: authLink.concat(httpLink),
    connectToDevTools: true,
  })
})
