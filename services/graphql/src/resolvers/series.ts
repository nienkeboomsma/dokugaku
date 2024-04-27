import { GQL_WordCountType, type GQL_Resolvers } from '@repo/graphql-types'

const resolvers: GQL_Resolvers = {
  Query: {
    series: (_, { input }, { dataSources: { series } }) => {
      return series.getSeries(input)
    },
    seriesList: (_, { input }, { dataSources: { series } }) => {
      return series.getSeriesList(input) ?? []
    },
  },
  Series: {
    volumes: async (parent, { userId }, { dataSources: { work } }) => {
      return work.getWorks({
        userId,
        workIds: parent.workIds,
      })
    },
    wordCount: async (parent, { input }, { dataSources: { series, word } }) => {
      const type = input?.type ?? GQL_WordCountType.Total

      if (type === GQL_WordCountType.Learnable) {
        const [data] = await word.getWords({
          excluded: false,
          ignored: false,
          known: false,
          rowCountOnly: true,
          seriesIdInWhichIgnored: parent.id,
          userId: input?.userId,
          workIds: parent.workIds,
        })
        return data.count
      }

      return series.getSeriesWordCount({
        seriesId: parent.id,
        type,
      })
    },
    words: (parent, { input }, { dataSources: { word } }) => {
      return word.getWords({
        ...input,
        seriesIdInWhichIgnored: parent.id,
        workIds: parent.workIds,
      })
    },
  },
}

export default resolvers
