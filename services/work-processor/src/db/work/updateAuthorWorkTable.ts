import { type TransactionSql } from 'postgres'

import { type WorkMetadata } from '../../utils/types.js'

type AuthorId = {
  id: string
}

export async function updateAuthorWorkTable(
  sql: TransactionSql,
  workId: WorkMetadata['workId'],
  authorIds: AuthorId[]
) {
  if (!authorIds || authorIds.length === 0) {
    throw new Error('No author IDs provided.')
  }

  const values = authorIds.map((authorId) => {
    return {
      author_id: authorId.id,
      work_id: workId,
    }
  })

  await sql`INSERT INTO author_work ${sql(values)}`
}
