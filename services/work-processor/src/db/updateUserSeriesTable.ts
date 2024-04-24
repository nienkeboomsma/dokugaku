import { type TransactionSql } from 'postgres'

export async function updateUserSeriesTable(
  sql: TransactionSql,
  userId: string,
  seriesId: string
) {
  const userSeries = {
    status: 'want to read',
    user_id: userId,
    series_id: seriesId,
  }

  await sql`
    INSERT INTO user_series ${sql(userSeries)} 
    ON CONFLICT (user_id, series_id) DO NOTHING
  `

  console.log('Updated user_series table')
}
