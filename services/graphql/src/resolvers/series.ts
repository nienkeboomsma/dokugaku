import { type Resolvers } from '@repo/graphql-types/generated/resolvers'

const resolvers: Resolvers = {
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
      return (
        work.getWorks({
          userId,
          workIds: parent.volumes,
        }) ?? []
      )
    },
    vocab: (parent, { input }, { dataSources: { word } }) => {
      return (
        word.getWords({
          ...input,
          workIds: parent.volumes,
        }) ?? []
      )
    },
  },
}

export default resolvers
