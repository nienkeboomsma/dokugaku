import pg from 'pg'

import { WorkMetadata } from '../utils/types.js'

export async function updateAuthorWorkTable(
  client: pg.Client,
  workId: WorkMetadata['workId'],
  authorIds: string[]
) {
  if (!authorIds || authorIds.length === 0) {
    throw new Error('No author IDs provided.')
  }

  const queryParameters = authorIds
    .map((authorId, index) => `($${index * 2 + 1}, $${index * 2 + 2})`)
    .join(',')

  const queryValues = authorIds.flatMap((authorId) => [authorId, workId])

  await client.query(
    `INSERT INTO author_work(author_id, work_id) VALUES ${queryParameters};`,
    queryValues
  )

  console.log('Updated author_work table')
}
