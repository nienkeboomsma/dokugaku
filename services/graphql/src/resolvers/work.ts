import { type Resolvers } from '../generated/graphql'

const resolvers: Resolvers = {
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
      if (!parent.series) return null
      return series.getSeries({ seriesId: parent.series, userId })
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
