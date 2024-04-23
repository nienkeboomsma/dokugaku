import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { loadFiles } from '@graphql-tools/load-files'
import { mergeTypeDefs } from '@graphql-tools/merge'

import { resolvers } from './resolvers/index.js'
import Author from './sources/Author.js'
import Series from './sources/Series.js'
import Word from './sources/Word.js'
import Work from './sources/Work.js'

async function main() {
  const typesArray = await loadFiles('./src/typedefs/*.graphql')
  const typeDefs = mergeTypeDefs(typesArray)

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  })

  const { url } = await startStandaloneServer(server, {
    context: async () => ({
      dataSources: {
        author: new Author(),
        series: new Series(),
        word: new Word(),
        work: new Work(),
      },
    }),
    listen: { port: Number(process.env.GRAPHQL_PORT) },
  })
  console.log(`Server ready at: ${url}`)
}

main()
