import { type Resolvers } from '../generated/graphql'

const resolvers: Resolvers = {
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
