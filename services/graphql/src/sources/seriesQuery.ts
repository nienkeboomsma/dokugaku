import sql from '../data/sql.js'

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

const userIdColumn = (params: QueryParams) => {
  if (!params.userId) {
    return sql`
      NULL AS "status"
    `
  }
  return sql`
    COALESCE (user_series.status, NULL) AS "status"
  `
}

const userIdJoin = (params: QueryParams) => {
  if (!params.userId) return sql``

  return sql`
    LEFT JOIN user_series 
      ON series.id = user_series.series_id
      AND ( user_series.user_id = ${params.userId}
        OR user_series.user_id IS NULL )
  `
}

const seriesIdFilter = (params: QueryParams) => {
  switch (params.return) {
    case 'single':
      return sql`WHERE series.id = ${params.seriesId}`
    case 'multiple':
      return sql`WHERE series.id IN ${sql(params.seriesIds)}`
    case 'all':
      return sql``
  }
}

const getSeriesQuery = (params: QueryParams) => {
  console.log({ ...params })
  return sql`
    SELECT 
      series.id, 
      series.title AS title,
      jsonb_agg(work.id) AS volumes,
      jsonb_agg(
        DISTINCT jsonb_build_object(
          'id', author.id,
          'name', author.author_name
        )
      ) AS authors,
      ${userIdColumn(params)}
    FROM series 
    JOIN work ON series.id = work.series_id
    JOIN author_work ON work.id = author_work.work_id
    JOIN author ON author_work.author_id = author.id
    ${userIdJoin(params)}
    ${seriesIdFilter(params)}
    GROUP BY
      series.id, 
      series.title,
      status
    ORDER BY
      series.title ASC;
  `
}

export default getSeriesQuery
