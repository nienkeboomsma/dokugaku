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

class WordQuery {
  params: QueryParams
  whereAlreadyUsed: boolean

  constructor(params: QueryParams) {
    this.params = params
    this.whereAlreadyUsed = false
  }

  selectDistinctWordsOnly() {
    if ('distinctOnly' in this.params && this.params.distinctOnly) {
      return sql`SELECT DISTINCT ON (word.id)`
    }

    return sql`SELECT`
  }

  ignoredColumn() {
    if (
      (!this.params.seriesIdInWhichIgnored &&
        !this.params.workIdInWhichIgnored) ||
      !this.params.userId
    ) {
      return sql`
        NULL AS "ignored",
      `
    }

    if (this.params.seriesIdInWhichIgnored && this.params.userId) {
      return sql`
        COALESCE (ignored_in_series.ignored, false) AS "ignored",
      `
    }

    if (this.params.workIdInWhichIgnored && this.params.userId) {
      return sql`
        COALESCE (ignored_in_work.ignored, false) AS "ignored",
      `
    }

    return sql``
  }

  userIdColumns() {
    if (!this.params.userId) {
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

  workIdColumns() {
    return sql`
      COALESCE (word_frequency.frequency, 0) AS frequency,
      word_work.volume_number AS "volumeNumber",
      word_work.page_number AS "pageNumber",
      word_work.sentence_number AS "sentenceNumber",
      word_work.entry_number AS "entryNumber",
      word_work.component_number AS "componentNumber",
    `
  }

  ignoredJoin() {
    if (
      (!this.params.seriesIdInWhichIgnored &&
        !this.params.workIdInWhichIgnored) ||
      !this.params.userId
    ) {
      return sql``
    }

    if (this.params.seriesIdInWhichIgnored && this.params.userId) {
      return sql`
        LEFT JOIN ignored_in_series 
          ON word.id = ignored_in_series.word_id
          AND ( ignored_in_series.user_id = ${this.params.userId}
            OR ignored_in_series.user_id IS NULL
          )
          AND ( ignored_in_series.series_id = ${this.params.seriesIdInWhichIgnored}
            OR ignored_in_series.series_id IS NULL
          )
      `
    }

    if (this.params.workIdInWhichIgnored && this.params.userId) {
      return sql`
        LEFT JOIN ignored_in_work 
          ON word.id = ignored_in_work.word_id
          AND ( ignored_in_work.user_id = ${this.params.userId}
            OR ignored_in_work.user_id IS NULL
          )
          AND ( ignored_in_work.work_id = ${this.params.workIdInWhichIgnored}
            OR ignored_in_work.work_id IS NULL
          )
      `
    }

    return sql``
  }

  userIdJoin() {
    if (!this.params.userId) return sql``

    return sql`
      LEFT JOIN user_word 
        ON word.id = user_word.word_id
        AND ( user_word.user_id = ${this.params.userId}
          OR user_word.user_id IS NULL
        )
    `
  }

  workIdJoin() {
    return sql`
      JOIN word_work 
        ON word.id = word_work.word_id
        ${
          this.params.workIds && this.params.workIds.length
            ? sql`
        AND word_work.work_id IN ${sql(this.params.workIds)}`
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
            this.params.workIds && this.params.workIds.length
              ? sql`
          WHERE work_id IN ${sql(this.params.workIds)}`
              : sql``
          }
        )
        GROUP BY word_id
      ) AS word_frequency ON word.id = word_frequency.word_id
    `
  }

  wordIdFilter() {
    switch (this.params.return) {
      case 'single':
        this.whereAlreadyUsed = true
        return sql`WHERE word.id = ${this.params.wordId}`
      case 'multiple':
        this.whereAlreadyUsed = true
        return sql`WHERE word.id IN ${sql(this.params.wordIds)}`
      case 'all':
        return sql``
    }
  }

  excludedFilter() {
    if (
      'excluded' in this.params &&
      typeof this.params.excluded === 'boolean'
    ) {
      const query = sql`
        ${this.whereAlreadyUsed ? sql`AND` : sql`WHERE`} 
        user_word.excluded = ${this.params.excluded}
      `
      this.whereAlreadyUsed = true
      return query
    }

    return sql``
  }

  ignoredFilter() {
    if (
      (!this.params.seriesIdInWhichIgnored &&
        !this.params.workIdInWhichIgnored) ||
      !this.params.userId ||
      !('ignored' in this.params) ||
      typeof this.params.ignored !== 'boolean'
    ) {
      return sql``
    }

    if (this.params.seriesIdInWhichIgnored && this.params.userId) {
      return sql`
        ${this.whereAlreadyUsed ? sql`AND` : sql`WHERE`} 
        ignored_in_series.ignored = ${this.params.ignored}
      `
    }

    if (this.params.workIdInWhichIgnored && this.params.userId) {
      return sql`
        ${this.whereAlreadyUsed ? sql`AND` : sql`WHERE`} 
        ignored_in_work.ignored = ${this.params.ignored}
      `
    }

    return sql``
  }

  knownFilter() {
    if ('known' in this.params && typeof this.params.known === 'boolean') {
      const query = sql`
        ${this.whereAlreadyUsed ? sql`AND` : sql`WHERE`} 
        user_word.known = ${this.params.known}
      `
      this.whereAlreadyUsed = true
      return query
    }

    return sql``
  }

  minFrequencyFilter() {
    if (
      'minFrequency' in this.params &&
      typeof this.params.minFrequency === 'number'
    ) {
      const query = sql`
        ${this.whereAlreadyUsed ? sql`AND` : sql`WHERE`} 
        word_frequency.frequency >= ${this.params.minFrequency}
      `
      this.whereAlreadyUsed = true
      return query
    }

    return sql``
  }

  minPageNumberFilter() {
    if (
      'minPageNumber' in this.params &&
      typeof this.params.minPageNumber === 'number'
    ) {
      const query = sql`
        ${this.whereAlreadyUsed ? sql`AND` : sql`WHERE`} 
        word_work.page_number >= ${this.params.minPageNumber}
      `
      this.whereAlreadyUsed = true
      return query
    }

    return sql``
  }

  pageNumberFilter() {
    if (
      'pageNumber' in this.params &&
      typeof this.params.pageNumber === 'number'
    ) {
      const query = sql`
        ${this.whereAlreadyUsed ? sql`AND` : sql`WHERE`} 
        word_work.page_number = ${this.params.pageNumber}
      `
      this.whereAlreadyUsed = true
      return query
    }

    return sql``
  }

  getQuery() {
    return sql`
      ${this.selectDistinctWordsOnly()}
        word.id,
        ${this.ignoredColumn()}
        ${this.userIdColumns()}
        ${this.workIdColumns()}
        word.info
      FROM word 
      ${this.ignoredJoin()}
      ${this.userIdJoin()}
      ${this.workIdJoin()}
      ${this.wordIdFilter()}
      ${this.excludedFilter()}
      ${this.ignoredFilter()}
      ${this.knownFilter()}
      ${this.minFrequencyFilter()}
      ${this.minPageNumberFilter()}
      ${this.pageNumberFilter()}

      ORDER BY
        ${'distinctOnly' in this.params && this.params.distinctOnly ? sql`word.id,` : sql``}
        word_work.volume_number ASC,
        word_work.page_number ASC,
        word_work.sentence_number ASC,
        word_work.entry_number ASC,
        word_work.component_number ASC;
    `
  }
}

export default WordQuery
