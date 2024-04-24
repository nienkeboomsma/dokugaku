import sql from '../data/sql.js'

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

const userIdColumns = (params: QueryParams) => {
  if (!params.userId) {
    return sql`
      NULL AS progress,
      NULL AS status
    `
  }
  return sql`
    COALESCE (user_work.current_progress, 0) AS progress,
    COALESCE (user_work.status, 'none') AS status
  `
}

const userIdJoin = (params: QueryParams) => {
  if (!params.userId) return sql``

  return sql`
    LEFT JOIN user_work 
      ON work.id = user_work.work_id
      AND (user_work.user_id = ${params.userId}
        OR user_work.user_id IS NULL
      )
  `
}

let useAnd = false

const workIdFilter = (params: QueryParams) => {
  switch (params.return) {
    case 'single':
      useAnd = true
      return sql`WHERE work.id = ${params.workId}`
    case 'multiple':
      useAnd = true
      return sql`WHERE work.id IN ${sql(params.workIds)}`
    case 'all':
      return sql``
  }
}

const excludeVolumesInSeries = (params: QueryParams) => {
  if (!params.excludeVolumesInSeries) {
    return sql``
  }

  return sql`
    ${useAnd ? sql`AND` : sql`WHERE`} 
    work.series_id IS NULL
    AND work.volume_number IS NULL
  `
}

const getWorksQuery = (params: QueryParams) => {
  return sql`
    SELECT
      work.id,
      jsonb_agg(
        jsonb_build_object(
          'id', author.id,
          'name', author.author_name
        )
      ) AS authors,
      work.series_id AS "series",
      work.max_progress AS "maxProgress",
      work.title,
      work.type,
      work.volume_number AS "numberInSeries",
      ${userIdColumns(params)}
    FROM work
    JOIN author_work ON work.id = author_work.work_id
    JOIN author ON author_work.author_id = author.id
    ${userIdJoin(params)}
    ${workIdFilter(params)}
    ${excludeVolumesInSeries(params)}
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

export default getWorksQuery
