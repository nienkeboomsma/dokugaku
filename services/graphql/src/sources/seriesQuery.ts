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

const filterBySeriesId = (params: QueryParams) => {
  switch (params.return) {
    case 'single':
      return sql`WHERE series.id = ${params.seriesId}`
    case 'multiple':
      return sql`WHERE series.id IN ${sql(params.seriesIds)}`
    case 'all':
      return sql``
  }
}

const userInfoColumn = (params: QueryParams) => {
  if (!params.userId) {
    return sql`
      NULL AS "status"
    `
  }
  return sql`
    user_series.status AS "status"
  `
}

const userInfoJoin = (params: QueryParams) => {
  if (!params.userId) return sql``

  return sql`JOIN user_series ON series.id = user_series.series_id`
}

const userInfoFilter = (params: QueryParams) => {
  if (!params.userId) {
    return sql``
  }

  if (params.return === 'all') {
    return sql`WHERE user_series.user_id = ${params.userId}`
  }

  return sql`AND user_series.user_id = ${params.userId}`
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
      ${userInfoColumn(params)}
    FROM series 
    JOIN work ON series.id = work.series_id
    JOIN author_work ON work.id = author_work.work_id
    JOIN author ON author_work.author_id = author.id
    ${userInfoJoin(params)}
    ${filterBySeriesId(params)}
    ${userInfoFilter(params)}
    GROUP BY
      series.id, 
      series.title,
      status
    ORDER BY
      series.title ASC;
  `
}

export default getSeriesQuery
