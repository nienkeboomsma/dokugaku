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
  Mutation: {
    updateIgnoredWord: async (
      _,
      { input },
      { userId, dataSources: { word } }
    ) => {
      try {
        const res = await word.updateIgnoredWord({
          ...input,
          userId,
        })

        return {
          code: 200,
          success: true,
          message: 'Word has successfully been updated',
          status: res?.[0].ignored,
        }
      } catch (err) {
        console.log(err, typeof err)
        return {
          code: 500,
          success: false,
          message: 'Unable to update word',
          status: null,
        }
      }
    },
  },
}

export default resolvers
