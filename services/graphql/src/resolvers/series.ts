import { type GQL_Resolvers } from '@repo/graphql-types'

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
    vocab: (parent, { input }, { dataSources: { word } }) => {
      return word.getWords({
        ...input,
        workIds: parent.workIds,
      })
    },
  },
}

export default resolvers
