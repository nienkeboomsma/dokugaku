import { type TransactionSql } from 'postgres'

type SeriesId = {
  id: string
}

export async function updateSeriesTable(
  sql: TransactionSql,
  seriesTitle: string
) {
  const series = { title: seriesTitle }

  const res = await sql<[SeriesId]>`
    INSERT INTO series ${sql(series)} 
    ON CONFLICT (title) DO UPDATE 
    SET title = EXCLUDED.title 
    RETURNING id
  `

  const seriesId = res[0].id
  return { seriesId }
}
