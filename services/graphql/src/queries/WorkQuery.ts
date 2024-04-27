import sql from '../data/sql.js'
import { WorkModel } from '../models/WorkModel.js'

type ReturnSingle = {
  return: 'single'
  workId: string
}

type ReturnMultiple = {
  return: 'multiple'
  workIds: string[]
}

type ReturnAll = {
  return: 'all'
}

type QueryParamsCommon = {
  excludeVolumesInSeries?: boolean
  userId?: string
}

type QueryParams = QueryParamsCommon &
  (ReturnSingle | ReturnMultiple | ReturnAll)

class WorkQuery {
  params: QueryParams
  whereAlreadyUsed: boolean

  constructor(params: QueryParams) {
    this.params = params
    this.whereAlreadyUsed = false
  }

  userIdColumns() {
    if (!this.params.userId) {
      return sql`
        NULL AS progress,
        NULL AS status,
      `
    }
    return sql`
      COALESCE (user_work.current_progress, 0) AS progress,
      COALESCE (user_work.status, 'new') AS status,
    `
  }

  userIdJoin() {
    if (!this.params.userId) return sql``

    return sql`
      LEFT JOIN user_work 
        ON work.id = user_work.work_id
        AND (user_work.user_id = ${this.params.userId}
          OR user_work.user_id IS NULL
        )
    `
  }

  workIdFilter() {
    switch (this.params.return) {
      case 'single':
        this.whereAlreadyUsed = true
        return sql`WHERE work.id = ${this.params.workId}`
      case 'multiple':
        this.whereAlreadyUsed = true
        return sql`WHERE work.id IN ${sql(this.params.workIds)}`
      case 'all':
        return sql``
    }
  }

  excludeVolumesInSeries() {
    if (!this.params.excludeVolumesInSeries) {
      return sql``
    }

    return sql`
      ${this.whereAlreadyUsed ? sql`AND` : sql`WHERE`} 
      work.series_id IS NULL
      AND work.volume_number IS NULL
    `
  }

  getQuery() {
    return sql<WorkModel[]>`
      SELECT
        work.id,
        jsonb_agg(
          jsonb_build_object(
            'id', author.id,
            'name', author.author_name
          )
        ) AS authors,
        work.series_id AS "seriesId",
        work.max_progress AS "maxProgress",
        work.title,
        work.type,
        work.volume_number AS "numberInSeries",
        ${this.userIdColumns()}
        work.hapax_legomenon_count AS "hapaxLegomena",
        work.total_word_count AS "totalWords",
        work.unique_word_count AS "uniqueWords"
      FROM work
      JOIN author_work ON work.id = author_work.work_id
      JOIN author ON author_work.author_id = author.id
      ${this.userIdJoin()}
      ${this.workIdFilter()}
      ${this.excludeVolumesInSeries()}
      GROUP BY 
        work.id,
        work.max_progress,
        work.title,
        work.type,
        work.volume_number,
        status,
        progress
      ORDER BY
        work.title ASC;
    `
  }
}

export default WorkQuery
