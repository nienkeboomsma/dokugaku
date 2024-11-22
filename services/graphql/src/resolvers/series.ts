import fs from 'node:fs'
import path from 'node:path'
import { type GQL_Resolvers } from '@repo/graphql-types'

import { volumePath } from '../utils/constants'

const resolvers: GQL_Resolvers = {
  Query: {
    series: (_, { input }, { userId, dataSources: { series } }) => {
      return series.getSeries({ ...input, userId })
    },
    seriesList: (_, { input }, { userId, dataSources: { series } }) => {
      return series.getSeriesList({ ...input, userId }) ?? []
    },
  },
  Mutation: {
    deleteSeries: async (_, { input }, { userId, dataSources: { series } }) => {
      try {
        const res = await series.getSeries({
          userId,
          seriesId: input.seriesId,
        })

        const workIds = res?.workIds
        if (!workIds)
          throw new Error('Unable to retrieve workIds for file removal')

        await series.deleteSeries({
          userId,
          seriesId: input.seriesId,
        })

        for (const workId of workIds) {
          const fullPath = path.join(volumePath, workId)
          fs.rmSync(fullPath, { recursive: true, force: true })
        }

        return {
          code: 204,
          success: true,
          message: 'Series has successfully been deleted',
        }
      } catch (err) {
        console.log(err, typeof err)
        return {
          code: 500,
          success: false,
          message: 'Unable to delete series',
        }
      }
    },
    updateSeriesReadStatus: async (
      _,
      { input },
      { userId, dataSources: { series } }
    ) => {
      try {
        const [res] = await series.updateSeriesReadStatus({
          seriesId: input.seriesId,
          status: input.status,
          userId,
        })
        return {
          code: 200,
          success: true,
          message: 'Series status has successfully been updated',
          status: res?.status,
        }
      } catch (err) {
        console.log(err, typeof err)
        return {
          code: 500,
          success: false,
          message: 'Unable to update series status',
          status: null,
        }
      }
    },
  },
  Series: {
    learnableWords: async (parent, _, { userId, dataSources: { word } }) => {
      return word.getLearnableWordCount({
        isSeries: true,
        seriesId: parent.id,
        userId,
      })
    },
    volumes: async (parent, _, { userId, dataSources: { work } }) => {
      const volumes = await work.getWorks({
        userId,
        workIds: parent.workIds,
      })

      return volumes.sort((volumeA, volumeB) => {
        if (!volumeA.numberInSeries || !volumeB.numberInSeries) return 1

        return volumeA.numberInSeries - volumeB.numberInSeries
      })
    },
    // words: (parent, { input }, { userId, dataSources: { word } }) => {
    //   return word.getWords({
    //     ...input,
    //     seriesIdInWhichIgnored: parent.id,
    //     userId,
    //     workIds: parent.workIds,
    //   })
    // },
  },
}

export default resolvers
