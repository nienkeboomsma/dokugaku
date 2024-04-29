import { GQL_WordCountType, type GQL_Resolvers } from '@repo/graphql-types'

const resolvers: GQL_Resolvers = {
  Query: {
    series: (_, { input }, { userId, dataSources: { series } }) => {
      return series.getSeries({ ...input, userId })
    },
    seriesList: (_, { input }, { userId, dataSources: { series } }) => {
      return series.getSeriesList({ ...input, userId }) ?? []
    },
  },
  Series: {
    volumes: async (parent, _, { userId, dataSources: { work } }) => {
      return work.getWorks({
        userId,
        workIds: parent.workIds,
      })
    },
    wordCount: async (
      parent,
      { input },
      { userId, dataSources: { series, word } }
    ) => {
      const type = input?.type ?? GQL_WordCountType.Total

      if (type === GQL_WordCountType.Learnable) {
        const [data] = await word.getWords({
          excluded: false,
          ignored: false,
          known: false,
          rowCountOnly: true,
          seriesIdInWhichIgnored: parent.id,
          userId,
          workIds: parent.workIds,
        })
        return data.count
      }

      return series.getSeriesWordCount({
        seriesId: parent.id,
        type,
      })
    },
    words: (parent, { input }, { userId, dataSources: { word } }) => {
      return word.getWords({
        ...input,
        seriesIdInWhichIgnored: parent.id,
        userId,
        workIds: parent.workIds,
      })
    },
  },
}

export default resolvers
