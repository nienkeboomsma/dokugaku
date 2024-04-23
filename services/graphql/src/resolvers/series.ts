import { type Resolvers } from '../generated/graphql'

const resolvers: Resolvers = {
  Query: {
    series: (_, { input }, { dataSources: { series } }) => {
      return series.getSeries(input)
    },
    seriesList: (_, { input }, { dataSources: { series } }) => {
      return series.getSeriesList(input)
    },
  },
  Series: {
    volumes: async (parent, { userId }, { dataSources: { work } }) => {
      return work.getWorks({
        userId,
        workIds: parent.volumes,
      })
    },
    vocab: (parent, { userId }, { dataSources: { word } }) => {
      return word.getWords({
        userId: userId,
        workIds: parent.volumes,
      })
    },
  },
}

export default resolvers
