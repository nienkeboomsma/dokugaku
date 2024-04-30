import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { loadFiles } from '@graphql-tools/load-files'
import { mergeTypeDefs } from '@graphql-tools/merge'

import { resolvers } from './resolvers/index.js'
import { type GQL_Context, createContext } from './context.js'

async function main() {
  const typesArray = await loadFiles('./src/typedefs/*.graphql')
  const typeDefs = mergeTypeDefs(typesArray)

  const server = new ApolloServer<GQL_Context>({
    typeDefs,
    resolvers,
  })

  const { url } = await startStandaloneServer<GQL_Context>(server, {
    context: createContext,
    listen: { port: Number(process.env.GRAPHQL_PORT) },
  })
  console.log(`Server ready at: ${url}`)
}

main()
