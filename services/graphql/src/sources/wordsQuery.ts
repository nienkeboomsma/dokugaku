// ALWAYS
// id: ID!
// info: JSON!

// USERID
// known: Boolean
// excluded: Boolean

// USERID AND WORKID/SERIESID
// ignored: Boolean

// WORKID/SERIESID    // distinct or all?
// frequency: Int
// volumeNumber: Int
// pageNumber: Int
// sentenceNumber: Int
// entryNumber: Int
// componentNumber: Int

// getWord (by ID)
// getWords (by IDs or all words)

import sql from '../data/sql.js'

type ReturnSingle = {
  return: 'single'
  wordId: string
}

type ReturnMultiple = {
  return: 'multiple'
  wordIds: string[]
}

type ReturnAll = {
  return: 'all'
}

type QueryParamsCommon = {
  distinctOnly?: boolean
  userId?: string
  workIds?: string[]
}

type QueryParams = QueryParamsCommon &
  (ReturnSingle | ReturnMultiple | ReturnAll)

const filterByWordId = (params: QueryParams) => {
  switch (params.return) {
    case 'single':
      return sql`WHERE word.id = ${params.wordId}`
    case 'multiple':
      return sql`WHERE word.id IN ${sql(params.wordIds)}`
    case 'all':
      return sql``
  }
}

const selectDistinctWordsOnly = (params: QueryParams) => {
  if (params.distinctOnly) {
    return sql`SELECT DISTINCT ON (word.id)`
  }

  return sql`SELECT`
}

const filterBySeriesIds = (params: QueryParams) => {}

const userInfoColumns = (params: QueryParams) => {
  if (!params.userId) {
    return sql`
      NULL AS "excluded",
      NULL AS "known",
    `
  }
  return sql`
    COALESCE (user_word.excluded, false) AS excluded, 
    COALESCE (user_word.known, false) AS known,
  `
}

const workInfoColumns = (params: QueryParams) => {
  if (!params.workIds || !params.workIds.length) {
    return sql`
      NULL AS "volumeNumber",
      NULL AS "pageNumber",
      NULL AS "sentenceNumber",
      NULL AS "entryNumber",
      NULL AS "componentNumber",
    `
  }
  return sql`
    word_work.volume_number AS "volumeNumber",
    word_work.page_number AS "pageNumber",
    word_work.sentence_number AS "sentenceNumber",
    word_work.entry_number AS "entryNumber",
    word_work.component_number AS componentNumber,
  `
}

const userInfoJoin = (params: QueryParams) => {
  if (!params.userId) return sql``

  return sql`LEFT JOIN user_word ON word.id = user_word.word_id`
}

const workInfoJoin = (params: QueryParams) => {
  if (!params.workIds || !params.workIds.length) return sql``

  return sql`LEFT JOIN word_work ON word.id = word_work.word_id`
}

const userInfoFilter = (params: QueryParams) => {
  if (!params.userId) {
    return sql``
  }

  if (params.return === 'all') {
    return sql`
      WHERE (
        user_word.user_id = ${params.userId}
        OR user_word.user_id IS NULL
      )
    `
  }

  return sql`
    AND ( 
      user_word.user_id = ${params.userId}
      OR user_word.user_id IS NULL 
    )
  `
}

const workInfoFilter = (params: QueryParams) => {
  if (!params.workIds || !params.workIds.length) return sql``

  if (params.return === 'all' && !params.userId) {
    return sql`WHERE word_work.work_id IN ${sql(params.workIds)}`
  }

  return sql`AND word_work.work_id IN ${sql(params.workIds)}`
}

const getWordsQuery = (params: QueryParams) => {
  return sql`
    ${selectDistinctWordsOnly(params)}
      word.id,
      ${userInfoColumns(params)}
      ${workInfoColumns(params)}
      word.info
    FROM word 
    ${userInfoJoin(params)}
    ${workInfoJoin(params)}
    ${filterByWordId(params)}
    ${userInfoFilter(params)}
    ${workInfoFilter(params)}
    ORDER BY
      ${params.distinctOnly ? sql`word.id,` : sql``}
      word_work.volume_number ASC,
      word_work.page_number ASC,
      word_work.sentence_number ASC,
      word_work.entry_number ASC,
      word_work.component_number ASC;
    `
}

export default getWordsQuery
