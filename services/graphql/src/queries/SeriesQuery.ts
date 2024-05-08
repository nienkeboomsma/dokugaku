import { GQL_ReadStatus } from '@repo/graphql-types'
import sql from '../data/sql.js'
import { SeriesModel } from '../models/SeriesModel.js'

type ReturnSingle = {
  return: 'single'
  seriesId: string
}

type ReturnMultiple = {
  return: 'multiple'
  seriesIds: string[]
}

type ReturnAll = {
  return: 'all'
}

type QueryParamsCommon = {
  status?: GQL_ReadStatus
  userId: string
}

type QueryParams = QueryParamsCommon &
  (ReturnSingle | ReturnMultiple | ReturnAll)

class SeriesQuery {
  params: QueryParams
  whereAlreadyUsed: boolean

  constructor(params: QueryParams) {
    this.params = params
    this.whereAlreadyUsed = false
  }

  seriesIdFilter() {
    switch (this.params.return) {
      case 'single':
        this.whereAlreadyUsed = true
        return sql`WHERE series.id = ${this.params.seriesId}`
      case 'multiple':
        this.whereAlreadyUsed = true
        return sql`WHERE series.id IN ${sql(this.params.seriesIds)}`
      case 'all':
        return sql``
    }
  }

  statusFilter() {
    if ('status' in this.params && typeof this.params.status !== 'undefined') {
      const query = sql`
        ${this.whereAlreadyUsed ? sql`AND` : sql`WHERE`} 
        COALESCE (user_series.status, 'new') = ${this.params.status}
      `
      this.whereAlreadyUsed = true
      return query
    }

    return sql``
  }

  runQuery() {
    return sql<SeriesModel[]>`
      SELECT 
        series.id, 
        series.title AS title,
        jsonb_agg(work.id) AS "workIds",
        jsonb_agg(
          DISTINCT jsonb_build_object(
            'id', author.id,
            'name', author.author_name
          )
        ) AS authors,
        series.hapax_legomenon_count AS "hapaxLegomena",
        series.total_word_count AS "totalWords",
        series.unique_word_count AS "uniqueWords",
        COALESCE (user_series.status, 'new') AS "status"
      FROM series 
      JOIN work ON series.id = work.series_id
      JOIN author_work ON work.id = author_work.work_id
      JOIN author ON author_work.author_id = author.id
      LEFT JOIN user_series 
        ON series.id = user_series.series_id
        AND ( user_series.user_id = ${this.params.userId}
          OR user_series.user_id IS NULL )
      ${this.seriesIdFilter()}
      ${this.statusFilter()}
      GROUP BY
        series.id, 
        series.title,
        status
      ORDER BY
        series.title ASC;
    `
  }
}

export default SeriesQuery
