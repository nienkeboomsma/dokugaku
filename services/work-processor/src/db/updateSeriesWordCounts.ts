import type { TransactionSql } from 'postgres'

export async function updateSeriesWordCounts(
  sql: TransactionSql,
  seriesId: string
) {
  await sql`
    WITH work_ids AS (
      SELECT id
      FROM work
      WHERE series_id = ${seriesId}
    ),
    word_counts AS (
      SELECT
        word_id,
        COUNT(*) AS word_count
      FROM word_work
      WHERE work_id IN (SELECT id FROM work_ids)
      GROUP BY word_id
    ),
    total_counts AS (
      SELECT
        SUM(word_count) AS total_word_count,
        COUNT(DISTINCT word_id) AS unique_word_count,
        COUNT(CASE WHEN word_count = 1 THEN 1 ELSE NULL END) AS hapax_legomenon_count
      FROM word_counts
    )
    UPDATE series
    SET
      total_word_count = total_counts.total_word_count,
      unique_word_count = total_counts.unique_word_count,
      hapax_legomenon_count = total_counts.hapax_legomenon_count
    FROM total_counts
    WHERE series.id = ${seriesId}
  `

  console.log('Updated series word counts')
}
