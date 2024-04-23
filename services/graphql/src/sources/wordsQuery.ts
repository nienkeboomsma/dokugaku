import sql from '../data/sql.js'

type ReturnSingle = {
  return: 'single'
  wordId: string
}

type ReturnMultiple = {
  distinctOnly?: boolean
  excluded?: boolean
  ignored?: boolean
  known?: boolean
  minFrequency?: number
  minPageNumber?: number
  pageNumber?: number
  return: 'multiple'
  wordIds: string[]
}

type ReturnAll = {
  distinctOnly?: boolean
  excluded?: boolean
  ignored?: boolean
  known?: boolean
  minFrequency?: number
  minPageNumber?: number
  pageNumber?: number
  return: 'all'
}

type QueryParamsCommon = {
  seriesIdInWhichIgnored?: string
  userId?: string
  workIdInWhichIgnored?: string
  workIds?: string[]
}

type QueryParams = QueryParamsCommon &
  (ReturnSingle | ReturnMultiple | ReturnAll)

const selectDistinctWordsOnly = (params: QueryParams) => {
  if ('distinctOnly' in params && params.distinctOnly) {
    return sql`SELECT DISTINCT ON (word.id)`
  }

  return sql`SELECT`
}

const ignoredColumn = (params: QueryParams) => {
  if (
    (!params.seriesIdInWhichIgnored && !params.workIdInWhichIgnored) ||
    !params.userId
  ) {
    console.table({ ...params })
    return sql`
      NULL AS "ignored",
    `
  }

  if (params.seriesIdInWhichIgnored && params.userId) {
    return sql`
      COALESCE (ignored_in_series.ignored, false) AS "ignored",
    `
  }

  if (params.workIdInWhichIgnored && params.userId) {
    return sql`
      COALESCE (ignored_in_work.ignored, false) AS "ignored",
    `
  }

  return sql``
}

const userIdColumns = (params: QueryParams) => {
  if (!params.userId) {
    return sql`
      NULL AS excluded,
      NULL AS known,
    `
  }
  return sql`
    COALESCE (user_word.excluded, false) AS excluded, 
    COALESCE (user_word.known, false) AS known,
  `
}

const workIdColumns = sql`
  COALESCE (word_frequency.frequency, 0) AS frequency,
  word_work.volume_number AS "volumeNumber",
  word_work.page_number AS "pageNumber",
  word_work.sentence_number AS "sentenceNumber",
  word_work.entry_number AS "entryNumber",
  word_work.component_number AS "componentNumber",
`

const ignoredJoin = (params: QueryParams) => {
  if (
    (!params.seriesIdInWhichIgnored && !params.workIdInWhichIgnored) ||
    !params.userId
  ) {
    return sql``
  }

  if (params.seriesIdInWhichIgnored && params.userId) {
    return sql`
      LEFT JOIN ignored_in_series 
        ON word.id = ignored_in_series.word_id
        AND ( ignored_in_series.user_id = ${params.userId}
          OR ignored_in_series.user_id IS NULL
        )
        AND ( ignored_in_series.series_id = ${params.seriesIdInWhichIgnored}
          OR ignored_in_series.series_id IS NULL
        )
    `
  }

  if (params.workIdInWhichIgnored && params.userId) {
    return sql`
      LEFT JOIN ignored_in_work 
        ON word.id = ignored_in_work.word_id
        AND ( ignored_in_work.user_id = ${params.userId}
          OR ignored_in_work.user_id IS NULL
        )
        AND ( ignored_in_work.work_id = ${params.workIdInWhichIgnored}
          OR ignored_in_work.work_id IS NULL
        )
    `
  }

  return sql``
}

const userIdJoin = (params: QueryParams) => {
  if (!params.userId) return sql``

  return sql`
    LEFT JOIN user_word 
      ON word.id = user_word.word_id
      AND ( user_word.user_id = ${params.userId}
        OR user_word.user_id IS NULL
      )
    `
}

const workIdJoin = (params: QueryParams) => {
  return sql`
    JOIN word_work 
      ON word.id = word_work.word_id
      ${
        params.workIds && params.workIds.length
          ? sql`
      AND word_work.work_id IN ${sql(params.workIds)}`
          : sql``
      }
    LEFT JOIN (
      SELECT
        word_id,
        COUNT(*) AS frequency
      FROM (
        SELECT 
         word_id
        FROM word_work
        ${
          params.workIds && params.workIds.length
            ? sql`
        WHERE work_id IN ${sql(params.workIds)}`
            : sql``
        }
      )
      GROUP BY word_id
    ) AS word_frequency ON word.id = word_frequency.word_id
  `
}

let useAnd = false

const wordIdFilter = (params: QueryParams) => {
  switch (params.return) {
    case 'single':
      useAnd = true
      return sql`WHERE word.id = ${params.wordId}`
    case 'multiple':
      useAnd = true
      return sql`WHERE word.id IN ${sql(params.wordIds)}`
    case 'all':
      return sql``
  }
}

const getWordsQuery = (params: QueryParams) => {
  return sql`
    ${selectDistinctWordsOnly(params)}
      word.id,
      ${ignoredColumn(params)}
      ${userIdColumns(params)}
      ${workIdColumns}
      word.info
    FROM word 
    ${ignoredJoin(params)}
    ${userIdJoin(params)}
    ${workIdJoin(params)}
    ${wordIdFilter(params)}
    ORDER BY
      ${'distinctOnly' in params && params.distinctOnly ? sql`word.id,` : sql``}
      word_work.volume_number ASC,
      word_work.page_number ASC,
      word_work.sentence_number ASC,
      word_work.entry_number ASC,
      word_work.component_number ASC;
    `
}

export default getWordsQuery
