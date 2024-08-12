import { type GQL_Resolvers } from '@repo/graphql-types'

const resolvers: GQL_Resolvers = {
  Query: {
    work: (_, { input }, { userId, dataSources: { work } }) => {
      return work.getWork({ ...input, userId })
    },
    workList: (_, { input }, { userId, dataSources: { work } }) => {
      return work.getWorks({ ...input, userId })
    },
  },
  Mutation: {
    updateWorkProgress: async (
      _,
      { input },
      { userId, dataSources: { work } }
    ) => {
      try {
        const [res] = await work.updateWorkProgress({
          progress: input.progress,
          userId,
          workId: input.workId,
        })

        return {
          code: 200,
          success: true,
          message: 'Work progress has successfully been updated',
          progress: res?.progress,
        }
      } catch (err) {
        console.log(err, typeof err)
        return {
          code: 500,
          success: false,
          message: 'Unable to update work progress',
          progress: null,
        }
      }
    },
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
    learnableWords: (parent, _, { userId, dataSources: { word } }) => {
      // @ts-expect-error (isPartOfSeries takes a union of true and false, ergo boolean)
      return word.getLearnableWordCount({
        isPartOfSeries: !!parent.seriesId,
        isSeries: false,
        seriesId: parent.seriesId ?? undefined,
        userId,
        workId: parent.id,
      })
    },
    modified: (parent) => {
      return parent.modified.valueOf()
    },
    series: (parent, _, { userId, dataSources: { series } }) => {
      if (!parent.seriesId) return null
      return series.getSeries({ seriesId: parent.seriesId, userId })
    },
  },
}

export default resolvers
