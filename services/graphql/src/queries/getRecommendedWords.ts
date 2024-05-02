import sql from '../data/sql'
import { type RecommendedWordModel } from '../models/RecommendedWordModel'

export function getRecommendedWords({
  limit,
  offset,
  userId,
}: {
  limit?: number
  offset?: number
  userId: string
}) {
  return sql<RecommendedWordModel[]>`
    SELECT 
      word.id,
      word.info,
      COUNT(*) AS "frequency"
    FROM word_work
    JOIN user_work 
      ON word_work.work_id = user_work.work_id
      AND user_work.user_id = ${userId}
      AND user_work.status = 'want_to_read'
      AND NOT EXISTS (
        SELECT 1
        FROM user_word
        WHERE user_word.user_id = user_work.user_id
        AND user_word.word_id = word_work.word_id
        AND (user_word.excluded = true OR user_word.known = true)
      )
    JOIN word
      ON word_work.word_id = word.id
    GROUP BY 
      word.id
    ORDER BY
      frequency DESC, id ASC
    ${limit ? sql`LIMIT ${limit}` : sql``}
    ${offset ? sql`OFFSET ${offset}` : sql``};
  `
}
