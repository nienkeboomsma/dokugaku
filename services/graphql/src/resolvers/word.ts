import { type GQL_Resolvers } from '@repo/graphql-types'

const resolvers: GQL_Resolvers = {
  Query: {
    word: (_, { input }, { dataSources: { word } }) => {
      return word.getWord(input)
    },
    wordList: async (_, { input }, { dataSources: { word } }) => {
      return word.getWords(input)
    },
  },
}

export default resolvers
