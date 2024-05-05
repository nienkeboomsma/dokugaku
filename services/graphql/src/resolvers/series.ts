import { type GQL_Resolvers } from '@repo/graphql-types'

const resolvers: GQL_Resolvers = {
  Query: {
    series: (_, { input }, { userId, dataSources: { series } }) => {
      return series.getSeries({ ...input, userId })
    },
    seriesList: (_, { input }, { userId, dataSources: { series } }) => {
      return series.getSeriesList({ ...input, userId }) ?? []
    },
  },
  Mutation: {
    updateSeriesReadStatus: async (
      _,
      { input },
      { userId, dataSources: { series } }
    ) => {
      try {
        const [res] = await series.updateSeriesReadStatus({
          seriesId: input.seriesId,
          status: input.status,
          userId,
        })
        return {
          code: 200,
          success: true,
          message: 'Series status has successfully been updated',
          status: res?.status,
        }
      } catch (err) {
        console.log(err, typeof err)
        return {
          code: 500,
          success: false,
          message: 'Unable to update series status',
          status: null,
        }
      }
    },
  },
  Series: {
    learnableWords: async (parent, _, { userId, dataSources: { word } }) => {
      return word.getLearnableWordCount({
        isSeries: true,
        seriesId: parent.id,
        userId,
      })
    },
    volumes: async (parent, _, { userId, dataSources: { work } }) => {
      return work.getWorks({
        userId,
        workIds: parent.workIds,
      })
    },
    // words: (parent, { input }, { userId, dataSources: { word } }) => {
    //   return word.getWords({
    //     ...input,
    //     seriesIdInWhichIgnored: parent.id,
    //     userId,
    //     workIds: parent.workIds,
    //   })
    // },
  },
}

export default resolvers
