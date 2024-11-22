import { GQL_ReadStatus } from '@repo/graphql-types'

import sql from '../data/sql'
import SeriesQuery from '../queries/SeriesQuery'

class Series {
  // TODO: Currently any user can delete any work; when using this for multiple
  // users it'd be wise to implement user roles and limit this to admins.
  async deleteSeries(input: { seriesId: string; userId: string }) {
    return sql<[{ progress: number }]>`
    DELETE FROM series
    WHERE id = ${input.seriesId};
  `
  }

  async getSeries(input: {
    seriesId: string
    status?: GQL_ReadStatus
    userId: string
  }) {
    const seriesQuery = new SeriesQuery({
      ...input,
      return: 'single',
      seriesId: input.seriesId,
    })
    const [series] = await seriesQuery.runQuery()
    return series
  }

  async getSeriesList(input: {
    seriesIds?: string[]
    status?: GQL_ReadStatus
    userId: string
  }) {
    if (input.seriesIds && input.seriesIds.length > 0) {
      const seriesQuery = new SeriesQuery({
        ...input,
        return: 'multiple' as const,
        seriesIds: input.seriesIds,
      })
      const series = await seriesQuery.runQuery()
      return series ?? []
    }

    const seriesQuery = new SeriesQuery({
      ...input,
      return: 'all' as const,
    })
    const series = await seriesQuery.runQuery()
    return series ?? []
  }

  async updateSeriesReadStatus(input: {
    seriesId: string
    status: GQL_ReadStatus
    userId: string
  }) {
    return sql<[{ status: GQL_ReadStatus }]>`
      UPDATE user_series
      SET status = ${input.status}
      WHERE user_id = ${input.userId} 
        AND series_id = ${input.seriesId}
      RETURNING status;
    `
  }
}

export default Series
