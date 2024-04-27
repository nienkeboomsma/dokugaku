import { GQL_WordCountType } from '@repo/graphql-types'

import WorkQuery from '../queries/WorkQuery'
import WordCountQuery from '../queries/WordCountQuery'

class Work {
  async getWork(input: {
    excludeVolumesInSeries?: boolean
    userId?: string
    workId: string
  }) {
    const workQuery = new WorkQuery({
      excludeVolumesInSeries: input.excludeVolumesInSeries,
      return: 'single',
      userId: input.userId,
      workId: input.workId,
    })
    const [work] = await workQuery.getQuery()
    return work
  }

  async getWorks(
    input: {
      excludeVolumesInSeries?: boolean
      userId?: string
      workIds?: string[]
    } = {}
  ) {
    if (input.workIds && input.workIds.length > 0) {
      const workQuery = new WorkQuery({
        excludeVolumesInSeries: input.excludeVolumesInSeries,
        return: 'multiple' as const,
        userId: input.userId,
        workIds: input.workIds,
      })
      const works = await workQuery.getQuery()
      return works ?? []
    }

    const workQuery = new WorkQuery({
      excludeVolumesInSeries: input.excludeVolumesInSeries,
      return: 'all' as const,
      userId: input.userId,
    })
    const works = await workQuery.getQuery()
    return works ?? []
  }

  async getWorkWordCount(input: { workId: string; type: GQL_WordCountType }) {
    const wordCountQuery = new WordCountQuery({
      seriesOrWork: 'work',
      seriesOrWorkId: input.workId,
      type: input.type,
    })
    const [data] = await wordCountQuery.getQuery()
    return data?.count
  }
}

export default Work
