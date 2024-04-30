import { type GQL_Resolvers } from '@repo/graphql-types'

const resolvers: GQL_Resolvers = {
  Query: {
    author: (_, { input }, { dataSources: { author } }) => {
      return author.getAuthor(input)
    },
    authorList: (_, { input }, { dataSources: { author } }) => {
      return author.getAuthors(input)
    },
  },
}

export default resolvers
