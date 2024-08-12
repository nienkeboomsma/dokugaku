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
  Mutation: {
    updateExcludedStatus: async (
      _,
      { input },
      { userId, dataSources: { word } }
    ) => {
      try {
        await word.updateExcludedStatus({
          excluded: input.excluded,
          userId,
          wordId: input.id,
        })

        return {
          code: 200,
          success: true,
          message: `Word has been successfully marked ${input.excluded ? 'excluded' : 'included'}`,
        }
      } catch {
        return {
          code: 500,
          success: false,
          message: `Unable to mark work as ${input.excluded ? 'excluded' : 'included'}`,
        }
      }
    },
    updateIgnoredStatus: async (
      _,
      { input },
      { userId, dataSources: { word } }
    ) => {
      if (!input.seriesIdInWhichIgnored && !input.workIdInWhichIgnored) {
        throw new Error(
          "A value for 'seriesIdInWhichIgnored' or 'workIdInWhichIgnored' must also be supplied"
        )
      }
      try {
        await word.updateIgnoredStatus({
          ignored: input.ignored,
          seriesIdInWhichIgnored: input.seriesIdInWhichIgnored,
          userId,
          wordId: input.id,
          workIdInWhichIgnored: input.workIdInWhichIgnored,
        })

        return {
          code: 200,
          success: true,
          message: `Word has been successfully marked ${input.ignored ? 'ignored' : 'unignored'}`,
        }
      } catch {
        return {
          code: 500,
          success: false,
          message: `Unable to mark work as ${input.ignored ? 'ignored' : 'unignored'}`,
        }
      }
    },
    updateKnownStatus: async (
      _,
      { input },
      { userId, dataSources: { word } }
    ) => {
      try {
        await word.updateKnownStatus({
          known: input.known,
          userId,
          wordId: input.id,
        })

        return {
          code: 200,
          success: true,
          message: `Word has been successfully marked ${input.known ? 'known' : 'unknown'}`,
        }
      } catch {
        return {
          code: 500,
          success: false,
          message: `Unable to mark work as ${input.known ? 'known' : 'unknown'}`,
        }
      }
    },
  },
}

export default resolvers
