import fs from 'fs'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

import { resolvers } from './resolvers.js'
import Author from './sources/Author.js'
import Series from './sources/Series.js'
import Word from './sources/Word.js'
import Work from './sources/Work.js'

const typeDefs = fs.readFileSync('./src/schema.graphql', { encoding: 'utf-8' })

async function main() {
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
