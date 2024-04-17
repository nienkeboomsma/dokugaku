import pg from 'pg'

import { WorkMetadata, isPartOfSeries } from '../utils/types.js'
import { updateAuthorTable } from './updateAuthorTable.js'
import { updateAuthorWorkTable } from './updateAuthorWorkTable.js'
import { updateSeriesTable } from './updateSeriesTable.js'
import { updateWorkTable } from './updateWorkTable.js'
import { updateUserSeriesTable } from './updateUserSeriesTable.js'
import { updateUserWorkTable } from './updateUserWorkTable.js'
import { updateWordWorkTable } from './updateWordWorkTable.js'

export async function insertIntoDatabase(
  workMetadata: WorkMetadata,
  userId: string,
  fullPath: string
) {
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

    if (!seriesAlreadyExists) {
      await updateUserSeriesTable(client, userId, seriesId)
    }

    workMetadata.seriesId = seriesId
  }

  await updateWorkTable(client, workMetadata)
  await updateUserWorkTable(client, userId, workMetadata.workId)

  const authorIds = await updateAuthorTable(client, workMetadata.authors)
  workMetadata.authorIds = authorIds
  await updateAuthorWorkTable(client, workMetadata.workId, authorIds)

  await updateWordWorkTable(client, workMetadata, fullPath)

  // const seriesInfo = await client.query('SELECT * FROM series')
  // const workInfo = await client.query('SELECT * FROM work')
  // const authorInfo = await client.query('SELECT * FROM author')
  // const authorWorkInfo = await client.query('SELECT * FROM author_work')
  // const user = await client.query('SELECT * FROM user_account')

  // console.log(
  // 'series:',
  // seriesInfo.rows,
  // 'work:',
  // workInfo.rows,
  // 'author:',
  // authorInfo.rows,
  // 'author_work:',
  // authorWorkInfo.rows,
  // 'user:',
  // user.rows
  // )

  await client.end()
}
