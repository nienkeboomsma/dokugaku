import { GQL_WordCountType, type GQL_Resolvers } from '@repo/graphql-types'

const resolvers: GQL_Resolvers = {
  Query: {
    work: (_, { input }, { userId, dataSources: { work } }) => {
      return work.getWork({ ...input, userId })
    },
    workList: async (_, { input }, { userId, dataSources: { work } }) => {
      return work.getWorks({ ...input, userId })
    },
  },
  Mutation: {
    updateWorkReadStatus: async (
      _,
      { input },
      { userId, dataSources: { work } }
    ) => {
      try {
        const [res] = await work.updateWorkReadStatus({
          status: input.status,
          userId,
          workId: input.workId,
        })

        return {
          code: 200,
          success: true,
          message: 'Work status has successfully been updated',
          status: res?.status,
        }
      } catch (err) {
        console.log(err, typeof err)
        return {
          code: 500,
          success: false,
          message: 'Unable to update work status',
          status: null,
        }
      }
    },
  },
  Work: {
    series: (parent, _, { userId, dataSources: { series } }) => {
      if (!parent.seriesId) return null
      return series.getSeries({ seriesId: parent.seriesId, userId })
    },
    wordCount: async (
      parent,
      { input },
      { userId, dataSources: { word, work } }
    ) => {
      const type = input?.type ?? GQL_WordCountType.Total

      if (type === GQL_WordCountType.Learnable) {
        const [data] = await word.getWords({
          excluded: false,
          ignored: false,
          known: false,
          rowCountOnly: true,
          userId,
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
    words: (parent, { input }, { userId, dataSources: { word } }) => {
      return word.getWords({
        ...input,
        userId,
        workIdInWhichIgnored: parent.id,
        workIds: [parent.id],
      })
    },
  },
}

export default resolvers
