import { GQL_ReadStatus, GQL_WordCountType } from '@repo/graphql-types'

import SeriesQuery from '../queries/SeriesQuery'
import WordCountQuery from '../queries/WordCountQuery'

class Series {
  async getSeries(input: {
    seriesId: string
    status?: GQL_ReadStatus
    userId?: string
  }) {
    const seriesQuery = new SeriesQuery({
      ...input,
      return: 'single',
      seriesId: input.seriesId,
    })
    const [series] = await seriesQuery.getQuery()
    return series
  }

  async getSeriesList(
    input: {
      seriesIds?: string[]
      status?: GQL_ReadStatus
      userId?: string
    } = {}
  ) {
    if (input.seriesIds && input.seriesIds.length > 0) {
      const seriesQuery = new SeriesQuery({
        ...input,
        return: 'multiple' as const,
        seriesIds: input.seriesIds,
      })
      const series = await seriesQuery.getQuery()
      return series ?? []
    }

    const seriesQuery = new SeriesQuery({
      ...input,
      return: 'all' as const,
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
