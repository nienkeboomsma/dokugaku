import { type Resolvers } from '../generated/graphql'

const resolvers: Resolvers = {
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
