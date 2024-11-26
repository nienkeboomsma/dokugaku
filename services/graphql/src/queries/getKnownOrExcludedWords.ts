import sql from '../data/sql'
import { type KnownOrExcludedWordModel } from '../models/KnownOrExcludedWordModel'

export function getKnownOrExcludedWords(params: {
  knownOrExcluded: 'known' | 'excluded'
  limit?: number
  offset?: number
  searchString?: string
  userId: string
}) {
  return sql<KnownOrExcludedWordModel[]>`
    SELECT 
      word.id,
      word.info,
      word.jlpt
    FROM
      word
    JOIN
      user_word
      ON user_word.word_id = word.id
      AND user_word.user_id = ${params.userId}
      AND user_word.${params.knownOrExcluded === 'known' ? sql`known` : sql`excluded`} = true
    ${
      params.searchString
        ? sql`
          WHERE word.info::text ILIKE '%' || ${params.searchString} || '%'
        `
        : sql``
    }
    ORDER BY
      word.id
    ${params.limit ? sql`LIMIT ${params.limit}` : sql``}
    ${params.offset ? sql`OFFSET ${params.offset}` : sql``};
  `
}
