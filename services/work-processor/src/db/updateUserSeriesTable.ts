import pg from 'pg'

export async function updateUserSeriesTable(
  client: pg.Client,
  userId: string,
  seriesId: string
) {
  await client.query(
    'INSERT INTO user_series(user_id, series_id) VALUES ($1, $2)',
    [userId, seriesId]
  )
}
