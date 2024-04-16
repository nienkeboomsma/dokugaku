import pg from 'pg'

export async function updateUserWorkTable(
  client: pg.Client,
  userId: string,
  workId: string
) {
  await client.query(
    'INSERT INTO user_work(user_id, work_id) VALUES ($1, $2)',
    [userId, workId]
  )
}
