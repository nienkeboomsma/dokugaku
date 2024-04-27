import { GQL_WordCountType, type GQL_Resolvers } from '@repo/graphql-types'

const resolvers: GQL_Resolvers = {
  Query: {
    work: (_, { input }, { dataSources: { work } }) => {
      return work.getWork(input)
    },
    workList: async (_, { input }, { dataSources: { work } }) => {
      return work.getWorks(input)
    },
  },
  Work: {
    series: (parent, { userId }, { dataSources: { series } }) => {
      if (!parent.seriesId) return null
      return series.getSeries({ seriesId: parent.seriesId, userId })
    },
    wordCount: async (parent, { input }, { dataSources: { word, work } }) => {
      const type = input?.type ?? GQL_WordCountType.Total

      if (type === GQL_WordCountType.Learnable) {
        const [data] = await word.getWords({
          excluded: false,
          ignored: false,
          known: false,
          rowCountOnly: true,
          userId: input?.userId,
          workIdInWhichIgnored: parent.id,
          workIds: [parent.id],
        })
        return data.count
      }

      return work.getWorkWordCount({
        workId: parent.id,
        type,
      })
    },
    words: (parent, { input }, { dataSources: { word } }) => {
      return word.getWords({
        ...input,
        workIdInWhichIgnored: parent.id,
        workIds: [parent.id],
      })
    },
  },
}

export default resolvers
