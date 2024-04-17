import pg from 'pg'
import { randomUUID } from 'crypto'

import { WorkMetadataSeries, isString } from '../utils/types.js'

export async function updateSeriesTable(
  client: pg.Client,
  seriesTitle: WorkMetadataSeries['seriesTitle']
) {
  type Row = { id: string }
  const existingSeries = await client.query<Row>(
    'SELECT id FROM series WHERE title = $1;',
    [seriesTitle]
  )

  const existingSeriesId = existingSeries.rows[0]?.id
  const seriesAlreadyExists = isString(existingSeriesId)

  const seriesId = seriesAlreadyExists ? existingSeriesId : randomUUID()

  if (!seriesAlreadyExists) {
    await client.query('INSERT INTO series(id, title) VALUES ($1, $2);', [
      seriesId,
      seriesTitle,
    ])
  }

  console.log('Updated series table')

  return { seriesAlreadyExists, seriesId }
}
