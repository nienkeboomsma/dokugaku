import { type TransactionSql } from 'postgres'

import { type WorkMetadata } from '../../utils/types.js'

type AuthorId = {
  id: string
}

export async function updateAuthorTable(
  sql: TransactionSql,
  authorNames: WorkMetadata['authors']
) {
  const values = authorNames.map((authorName) => {
    return { author_name: authorName }
  })

  const authorIds = await sql<AuthorId[]>`
    INSERT INTO author ${sql(values)}
    ON CONFLICT (author_name) DO UPDATE
    SET author_name = EXCLUDED.author_name
    RETURNING id
  `

  console.log('Updated author table')
  return authorIds
}
