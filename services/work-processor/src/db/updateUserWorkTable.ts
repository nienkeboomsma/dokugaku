import { type TransactionSql } from 'postgres'

export async function updateUserWorkTable(
  sql: TransactionSql,
  userId: string,
  workId: string
) {
  const userWork = { user_id: userId, work_id: workId }

  await sql`INSERT INTO user_work ${sql(userWork)}`

  console.log('Updated user_work table')
}
