import { type GQL_Resolvers } from '@repo/graphql-types'

const resolvers: GQL_Resolvers = {
  Query: {
    word: (_, { input }, { userId, dataSources: { word } }) => {
      return word.getWord({ ...input, userId })
    },
    wordList: async (_, { input }, { userId, dataSources: { word } }) => {
      return word.getWords({ ...input, userId })
    },
  },
}

export default resolvers
