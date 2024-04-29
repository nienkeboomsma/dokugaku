import { GQL_ReadStatus } from '@repo/graphql-types'
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
  status?: GQL_ReadStatus
  userId: string
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

    const query = sql`
      ${this.whereAlreadyUsed ? sql`AND` : sql`WHERE`} 
      work.series_id IS NULL
      AND work.volume_number IS NULL
    `
    this.whereAlreadyUsed = true
    return query
  }

  statusFilter() {
    if ('status' in this.params && typeof this.params.status !== 'undefined') {
      const query = sql`
        ${this.whereAlreadyUsed ? sql`AND` : sql`WHERE`} 
        COALESCE (user_work.status, 'new') = ${this.params.status}
      `
      this.whereAlreadyUsed = true
      return query
    }

    return sql``
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
        work.hapax_legomenon_count AS "hapaxLegomena",
        work.total_word_count AS "totalWords",
        work.unique_word_count AS "uniqueWords",
        COALESCE (user_work.current_progress, 0) AS progress,
        COALESCE (user_work.status, 'new') AS status
      FROM work
      JOIN author_work ON work.id = author_work.work_id
      JOIN author ON author_work.author_id = author.id
      LEFT JOIN user_work 
        ON work.id = user_work.work_id
        AND (user_work.user_id = ${this.params.userId}
          OR user_work.user_id IS NULL )
      ${this.workIdFilter()}
      ${this.excludeVolumesInSeries()}
      ${this.statusFilter()}
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
