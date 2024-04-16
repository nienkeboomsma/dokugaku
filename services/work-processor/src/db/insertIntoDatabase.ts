import pg from 'pg'

import { WorkMetadata, isPartOfSeries } from '../utils/types.js'
import { updateAuthorTable } from './updateAuthorTable.js'
import { updateAuthorWorkTable } from './updateAuthorWorkTable.js'
import { updateSeriesTable } from './updateSeriesTable.js'
import { updateWorkTable } from './updateWorkTable.js'

export async function insertIntoDatabase(workMetadata: WorkMetadata) {
  const config = {
    user: 'postgres',
    password: process.env.POSTGRES_PASSWORD,
    database: 'db',
    host: 'db',
    port: 5432,
  }
  const { Client } = pg
  const client = new Client(config)
  await client.connect()

  if (isPartOfSeries(workMetadata)) {
    const { seriesAlreadyExists, seriesId } = await updateSeriesTable(
      client,
      workMetadata.seriesTitle
    )

    console.log(seriesAlreadyExists)

    workMetadata.seriesAlreadyExists = seriesAlreadyExists
    workMetadata.seriesId = seriesId
  }

  await updateWorkTable(client, workMetadata)

  const authorIds = await updateAuthorTable(client, workMetadata.authors)
  workMetadata.authorIds = authorIds

  await updateAuthorWorkTable(client, workMetadata.workId, authorIds)

  const seriesInfo = await client.query('SELECT * FROM series')
  const workInfo = await client.query('SELECT * FROM work')
  const authorInfo = await client.query('SELECT * FROM author')
  const authorWorkInfo = await client.query('SELECT * FROM author_work')

  console.log(
    'series:',
    seriesInfo.rows,
    'work:',
    workInfo.rows,
    'author:',
    authorInfo.rows,
    'author_work:',
    authorWorkInfo.rows
  )

  await client.end()
}
