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
  userId?: string
}

type QueryParams = QueryParamsCommon &
  (ReturnSingle | ReturnMultiple | ReturnAll)

class SeriesQuery {
  params: QueryParams

  constructor(params: QueryParams) {
    this.params = params
  }

  userIdColumn() {
    if (!this.params.userId) {
      return sql`
        NULL AS "status",
      `
    }
    return sql`
      COALESCE (user_series.status, NULL) AS "status",
    `
  }

  userIdJoin() {
    if (!this.params.userId) return sql``

    return sql`
      LEFT JOIN user_series 
        ON series.id = user_series.series_id
        AND ( user_series.user_id = ${this.params.userId}
          OR user_series.user_id IS NULL )
    `
  }

  seriesIdFilter() {
    switch (this.params.return) {
      case 'single':
        return sql`WHERE series.id = ${this.params.seriesId}`
      case 'multiple':
        return sql`WHERE series.id IN ${sql(this.params.seriesIds)}`
      case 'all':
        return sql``
    }
  }

  getQuery() {
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
        ${this.userIdColumn()}
        series.hapax_legomenon_count AS "hapaxLegomena",
        series.total_word_count AS "totalWords",
        series.unique_word_count AS "uniqueWords"
      FROM series 
      JOIN work ON series.id = work.series_id
      JOIN author_work ON work.id = author_work.work_id
      JOIN author ON author_work.author_id = author.id
      ${this.userIdJoin()}
      ${this.seriesIdFilter()}
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
