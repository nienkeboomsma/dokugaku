import type { TransactionSql } from 'postgres'

export async function updateWorkWordCounts(
  sql: TransactionSql,
  workId: string
) {
  await sql`
    WITH word_counts AS (
      SELECT
        word_id,
        COUNT(*) AS word_count
      FROM word_work
      WHERE work_id = ${workId}
      GROUP BY word_id
    ),
    total_counts AS (
      SELECT
        SUM(word_count) AS total_word_count,
        COUNT(*) AS unique_word_count,
        COUNT(CASE WHEN word_count = 1 THEN 1 ELSE NULL END) AS hapax_legomenon_count
      FROM word_counts
    )
    UPDATE work
    SET
      total_word_count = total_counts.total_word_count,
      unique_word_count = total_counts.unique_word_count,
      hapax_legomenon_count = total_counts.hapax_legomenon_count
    FROM total_counts
    WHERE work.id = ${workId}
  `

  console.log('Updated work word counts')
}
