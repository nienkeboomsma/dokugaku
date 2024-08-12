import sql from '../data/sql'
import { type FrequencyListModel } from '../models/FrequencyListModel'

type GetFrequencyListParamsCommon = {
  limit?: number
  offset?: number
  searchString?: string
  userId: string
}

type GetFrequencyListParamsSeries = {
  isSeries: true
  seriesId: string
}

type GetFrequencyListParamsWorkInSeries = {
  isSeries: false
  isPartOfSeries: true
  seriesId: string
  workId: string
}

type GetFrequencyListParamsWorkNotInSeries = {
  isSeries: false
  isPartOfSeries: false
  workId: string
}

type GetFrequencyListParams = GetFrequencyListParamsCommon &
  (
    | GetFrequencyListParamsSeries
    | GetFrequencyListParamsWorkInSeries
    | GetFrequencyListParamsWorkNotInSeries
  )

export function getFrequencyList(params: GetFrequencyListParams) {
  return sql<FrequencyListModel[]>`
    SELECT
      word.id,
      word.info,
      COUNT(*) AS "frequency",
      ${
        params.isSeries || params.isPartOfSeries
          ? sql`
            COALESCE(ignored_in_series.ignored, false) AS "ignored"
          `
          : sql`
            COALESCE(ignored_in_work.ignored, false) AS "ignored"
          `
      }

    FROM WORK

    JOIN word_work 
      ON word_work.work_id = work.id

    ${
      params.isSeries || params.isPartOfSeries
        ? sql`
          LEFT JOIN ignored_in_series 
            ON ignored_in_series.word_id = word_work.word_id
            AND ignored_in_series.series_id = ${params.seriesId}
            AND ignored_in_series.user_id = ${params.userId}
        `
        : sql`
          LEFT JOIN ignored_in_work 
            ON ignored_in_work.word_id = word_work.word_id
            AND ignored_in_work.user_id = ${params.userId}
            AND ignored_in_work.work_id = ${params.workId}
        `
    }

    JOIN word 
      ON word_work.word_id = word.id

    LEFT JOIN user_word
      ON user_word.word_id = word_work.word_id
      AND user_word.user_id = ${params.userId}

    WHERE COALESCE(user_word.known, false) = false
      AND COALESCE(user_word.excluded, false) = false
      ${
        params.isSeries
          ? sql`
            AND work.series_id = ${params.seriesId}
          `
          : sql`
            AND work.id = ${params.workId}
          `
      }
      ${
        params.searchString
          ? sql`
            AND word.info::text ILIKE '%' || ${params.searchString} || '%'
          `
          : sql``
      }

    GROUP BY
      word.id,
      word.info,
      ignored

    ORDER BY
      "frequency" DESC,
      word.id ASC

    ${params.limit ? sql`LIMIT ${params.limit}` : sql``}
    ${params.offset ? sql`OFFSET ${params.offset}` : sql``};
  `
}
