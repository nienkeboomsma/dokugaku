import GraphQLJSON from 'graphql-type-json'

import { type Resolvers } from './generated/graphql'

export const resolvers: Resolvers = {
  JSON: GraphQLJSON,
  ReadStatus: {
    ABANDONED: 'abandoned',
    NONE: 'none',
    READ: 'read',
    READING: 'reading',
    WANT_TO_READ: 'want to read',
  },
  WorkType: {
    MANGA: 'manga',
    NOVEL: 'novel',
  },
  Query: {
    author: (_, { input }, { dataSources: { author } }) => {
      return author.getAuthor(input)
    },
    authorList: (_, { input }, { dataSources: { author } }) => {
      return author.getAuthors(input)
    },
    series: (_, { input }, { dataSources: { series } }) => {
      return series.getSeries(input)
    },
    seriesList: (_, { input }, { dataSources: { series } }) => {
      return series.getSeriesList(input)
    },
    word: (_, { input }, { dataSources: { word } }) => {
      return word.getWord(input)
    },
    wordList: async (_, { input }, { dataSources: { word } }) => {
      const words = await word.getWords(input)
      console.log(words.slice(0, 5))
      return words
    },
    work: (_, { input }, { dataSources: { work } }) => {
      return work.getWork(input)
    },
    workList: async (_, { input }, { dataSources: { work } }) => {
      return work.getWorks(input)
    },
  },
  Series: {
    volumes: async (parent, { userId }, { dataSources: { work } }) => {
      return await work.getWorks({
        userId,
        workIds: parent.volumes,
      })
    },
  },
  Work: {
    series: (parent, { userId }, { dataSources: { series } }) => {
      if (!parent.series) return null
      return series.getSeries(parent.series, userId)
    },
    // vocab: (parent) => {
    // get words by work id? Or supply an array of ids from work_word?
    // },
  },
}
