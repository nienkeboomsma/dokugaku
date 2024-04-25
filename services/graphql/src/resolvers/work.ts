import { type GQL_Resolvers } from '@repo/graphql-types'

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
    vocab: (parent, { input }, { dataSources: { word } }) => {
      return word.getWords({
        ...input,
        workIds: [parent.id],
      })
    },
  },
}

export default resolvers
