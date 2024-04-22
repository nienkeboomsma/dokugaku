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

const filterByWorkId = (params: QueryParams) => {
  switch (params.return) {
    case 'single':
      return sql`WHERE work.id = ${params.workId}`
    case 'multiple':
      return sql`WHERE work.id IN ${sql(params.workIds)}`
    case 'all':
      return sql``
  }
}

const excludeVolumesInSeries = (params: QueryParams) => {
  if (!params.excludeVolumesInSeries) {
    return sql``
  }

  if (params.return === 'all') {
    return sql`
      WHERE work.series_id IS NULL
      AND work.volume_number IS NULL
    `
  }

  return sql`
    AND work.series_id IS NULL
    AND work.volume_number IS NULL
  `
}

const userInfoColumns = (params: QueryParams) => {
  if (!params.userId) {
    return sql`
      NULL AS "progress",
      NULL AS "status"
    `
  }
  return sql`
    user_work.current_progress AS "progress",
    user_work.status AS "status"
  `
}

const userInfoJoin = (params: QueryParams) => {
  if (!params.userId) return sql``

  return sql`JOIN user_work ON work.id = user_work.work_id`
}

const userInfoFilter = (params: QueryParams) => {
  if (!params.userId) {
    return sql``
  }

  if (params.return === 'all' && !params.excludeVolumesInSeries) {
    return sql`WHERE user_work.user_id = ${params.userId}`
  }

  return sql`AND user_work.user_id = ${params.userId}`
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
      ${userInfoColumns(params)}
    FROM work
    JOIN author_work ON work.id = author_work.work_id
    JOIN author ON author_work.author_id = author.id
    ${userInfoJoin(params)}
    ${filterByWorkId(params)}
    ${excludeVolumesInSeries(params)}
    ${userInfoFilter(params)}
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
