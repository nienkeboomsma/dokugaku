import fs from 'fs'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

import { resolvers } from './resolvers.js'
import Author from './sources/Author.js'
import sql from './data/sql.js'

const typeDefs = fs.readFileSync('./src/schema.graphql', { encoding: 'utf-8' })

async function main() {
  console.log(await sql`SELECT * FROM series;`)
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  })

  const { url } = await startStandaloneServer(server, {
    context: async () => ({
      dataSources: {
        author: new Author(),
      },
    }),
    listen: { port: Number(process.env.GRAPHQL_PORT) },
  })
  console.log(`Server ready at: ${url}`)
}

main()
