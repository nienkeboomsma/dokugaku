import { type GQL_Resolvers } from '@repo/graphql-types'

const resolvers: GQL_Resolvers = {
  Query: {
    excludedWords: (_, { input }, { userId, dataSources: { word } }) => {
      return word.getKnownOrExcludedWords({
        ...input,
        knownOrExcluded: 'excluded',
        userId,
      })
    },
    frequencyList: (_, { input }, { userId, dataSources: { word } }) => {
      if (input.isSeries && !input.seriesId) {
        throw new Error('If isSeries is true, seriedId must be supplied')
      }

      if (
        !input.isSeries &&
        (typeof input.isPartOfSeries === 'undefined' || !input.workId)
      ) {
        throw new Error(
          'If isSeries is false, isPartOfSeries and workId must be supplied'
        )
      }

      // @ts-expect-error (isPartOfSeries takes a union of true and false, ergo boolean)
      return word.getFrequencyList({
        ...input,
        userId,
      })
    },
    glossary: (_, { input }, { userId, dataSources: { word } }) => {
      if (input.isPartOfSeries && !input.seriesId) {
        throw new Error('If isPartOfSeries is true, seriedId must be supplied')
      }

      // @ts-expect-error (isPartOfSeries takes a union of true and false, ergo boolean)
      return word.getGlossary({
        ...input,
        userId,
      })
    },
    knownWords: (_, { input }, { userId, dataSources: { word } }) => {
      return word.getKnownOrExcludedWords({
        ...input,
        knownOrExcluded: 'known',
        userId,
      })
    },
    recommendedWords: (_, { input }, { userId, dataSources: { word } }) => {
      return word.getRecommendedWords({
        ...input,
        userId,
      })
    },
  },
  // Mutation: {
  //   updateIgnoredWord: async (
  //     _,
  //     { input },
  //     { userId, dataSources: { word } }
  //   ) => {
  //     try {
  //       const res = await word.updateIgnoredWord({
  //         ...input,
  //         userId,
  //       })

  //       return {
  //         code: 200,
  //         success: true,
  //         message: 'Word has successfully been updated',
  //         status: res?.[0].ignored,
  //       }
  //     } catch (err) {
  //       console.log(err, typeof err)
  //       return {
  //         code: 500,
  //         success: false,
  //         message: 'Unable to update word',
  //         status: null,
  //       }
  //     }
  //   },
  // },
}

export default resolvers
