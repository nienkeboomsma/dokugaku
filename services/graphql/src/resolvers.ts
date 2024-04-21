import { type Resolvers } from './generated/graphql'

export const resolvers: Resolvers = {
  Query: {
    author: (_, { input: { id } }, { dataSources: { author } }) => {
      return author.getAuthor(id)
    },
    authorList: (_, __, { dataSources: { author } }) => {
      return author.getAuthors()
    },
  },
}
