import sql from '../data/sql'
import { type GlossaryModel } from '../models/GlossaryModel'

type GetGlossaryParamsCommon = {
  limit?: number
  offset?: number
  searchString?: string
  userId: string
}

type GetGlossaryParamsWorkInSeries = {
  isPartOfSeries: true
  seriesId: string
  workId: string
}

type GetGlossaryParamsWorkNotInSeries = {
  isPartOfSeries: false
  workId: string
}

type GetGlossaryParams = GetGlossaryParamsCommon &
  (GetGlossaryParamsWorkInSeries | GetGlossaryParamsWorkNotInSeries)

export function getGlossary(params: GetGlossaryParams) {
  return sql<GlossaryModel[]>`
      SELECT
        word.id,
        word.info,
        word_frequency.frequency,
        word_work.volume_number AS "volumeNumber",
        word_work.page_number AS "pageNumber",
        word_work.sentence_number AS "sentenceNumber",
        word_work.entry_number AS "entryNumber",
        word_work.component_number AS "componentNumber",
        ${
          params.isPartOfSeries
            ? sql`
              COALESCE(ignored_in_series.ignored, false) AS "ignored"
            `
            : sql`
              COALESCE(ignored_in_work.ignored, false) AS "ignored"
            `
        }

      FROM word_work

      ${
        params.isPartOfSeries
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
        ON word.id = user_word.word_id
        AND user_word.user_id = ${params.userId}

      LEFT JOIN (
        SELECT
          word_id,
          COUNT(*) AS frequency
        FROM (
          SELECT word_id
          FROM word_work
          WHERE work_id = ${params.workId}
        )
        GROUP BY word_id
      ) AS word_frequency 
        ON word.id = word_frequency.word_id

      WHERE COALESCE(user_word.excluded, false) = false
        AND COALESCE(user_word.known, false) = false
        AND word_work.work_id = ${params.workId}
        ${
          params.searchString
            ? sql`
              AND word.info::text ILIKE '%' || ${params.searchString} || '%'
            `
            : sql``
        }

      ORDER BY
        word_work.volume_number ASC,
        word_work.page_number ASC,
        word_work.sentence_number ASC,
        word_work.entry_number ASC,
        word_work.component_number ASC

      ${params.limit ? sql`LIMIT ${params.limit}` : sql``}
      ${params.offset ? sql`OFFSET ${params.offset}` : sql``};
      `
}
