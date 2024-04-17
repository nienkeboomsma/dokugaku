import pg from 'pg'
import { randomUUID } from 'node:crypto'

import { WorkMetadataSeries } from '../utils/types.js'

export async function updateAuthorTable(
  client: pg.Client,
  authorNames: WorkMetadataSeries['authors']
) {
  type Row = { id: string; author_name: string }

  const existingAuthors = await client.query<Row>(
    'SELECT id, author_name FROM author WHERE author_name = ANY($1)',
    [authorNames]
  )

  const newAuthorInfo = authorNames.reduce<Row[]>((newAuthors, authorName) => {
    const authorAlreadyExists = existingAuthors.rows.some(
      (author) => author.author_name === authorName
    )

    if (authorAlreadyExists) return newAuthors

    return [...newAuthors, { id: randomUUID(), author_name: authorName }]
  }, [])

  if (newAuthorInfo.length > 0) {
    const queryParameters = newAuthorInfo
      .map((author, index) => `($${index * 2 + 1}, $${index * 2 + 2})`)
      .join(',')

    const queryValues = newAuthorInfo.flatMap((author) => [
      author.id,
      author.author_name,
    ])

    await client.query(
      `INSERT INTO author(id, author_name) VALUES ${queryParameters}`,
      queryValues
    )
  }

  const existingAuthorIds = existingAuthors.rows.map((author) => author.id)
  const newAuthorIds = newAuthorInfo.map((author) => author.id)
  const allAuthorIds = existingAuthorIds.concat(newAuthorIds)

  return allAuthorIds
}
