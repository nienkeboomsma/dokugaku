import { GQL_WordCountType } from '@repo/graphql-types'

import SeriesQuery from '../queries/SeriesQuery'
import WordCountQuery from '../queries/WordCountQuery'

class Series {
  async getSeries(input: { userId?: string; seriesId: string }) {
    const seriesQuery = new SeriesQuery({
      return: 'single',
      userId: input.userId,
      seriesId: input.seriesId,
    })
    const [series] = await seriesQuery.getQuery()
    return series
  }

  async getSeriesList(
    input: {
      userId?: string
      seriesIds?: string[]
    } = {}
  ) {
    if (input.seriesIds && input.seriesIds.length > 0) {
      const seriesQuery = new SeriesQuery({
        return: 'multiple' as const,
        userId: input.userId,
        seriesIds: input.seriesIds,
      })
      const series = await seriesQuery.getQuery()
      return series ?? []
    }

    const seriesQuery = new SeriesQuery({
      return: 'all' as const,
      userId: input.userId,
    })
    const series = await seriesQuery.getQuery()
    return series ?? []
  }

  async getSeriesWordCount(input: {
    seriesId: string
    type: GQL_WordCountType
  }) {
    const wordCountQuery = new WordCountQuery({
      seriesOrWork: 'series',
      seriesOrWorkId: input.seriesId,
      type: input.type,
    })
    const [data] = await wordCountQuery.getQuery()
    return data?.count
  }
}

export default Series
