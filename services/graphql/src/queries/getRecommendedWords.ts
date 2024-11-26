import sql from '../data/sql'
import { type RecommendedWordModel } from '../models/RecommendedWordModel'

export function getRecommendedWords({
  limit,
  offset,
  searchString,
  userId,
}: {
  limit?: number
  offset?: number
  searchString?: string
  userId: string
}) {
  return sql<RecommendedWordModel[]>`
    SELECT 
      word.id,
      word.info,
      word.jlpt,
      COUNT(*) AS "frequency"
    FROM word_work
    JOIN user_work 
      ON word_work.work_id = user_work.work_id
      AND user_work.user_id = ${userId}
      AND ( user_work.status = 'want_to_read'
        OR user_work.status = 'reading' )
    JOIN work
      ON word_work.work_id = work.id
    LEFT JOIN ignored_in_series
      ON ignored_in_series.word_id = word_work.word_id
      AND ignored_in_series.series_id = work.series_id
      AND ignored_in_series.user_id = user_work.user_id
    LEFT JOIN ignored_in_work
      ON ignored_in_work.word_id = word_work.word_id
      AND ignored_in_work.work_id = word_work.work_id
      AND ignored_in_work.user_id = user_work.user_id
    JOIN word
      ON word_work.word_id = word.id
    WHERE NOT EXISTS (
      SELECT 1
      FROM user_word
      WHERE user_word.user_id = user_work.user_id
        AND user_word.word_id = word_work.word_id
        AND (user_word.excluded = true OR user_word.known = true)
    ) 
    AND (
      ( ignored_in_series.ignored IS NULL AND ignored_in_work.ignored IS NULL )
      OR
      ( ignored_in_series.ignored IS NOT NULL AND ignored_in_series.ignored = false )
      OR
      ( ignored_in_work.ignored IS NOT NULL AND ignored_in_work.ignored = false )
    )
    ${
      searchString
        ? sql`
          AND word.info::text ILIKE '%' || ${searchString} || '%'
        `
        : sql``
    }
    GROUP BY 
      word.id
    ORDER BY
      frequency DESC, id ASC
    ${limit ? sql`LIMIT ${limit}` : sql``}
    ${offset ? sql`OFFSET ${offset}` : sql``};
  `
}
