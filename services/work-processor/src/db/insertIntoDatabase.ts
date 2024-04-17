import pg from 'pg'

import { WorkMetadata, isPartOfSeries } from '../utils/types.js'
import { updateAuthorTable } from './updateAuthorTable.js'
import { updateAuthorWorkTable } from './updateAuthorWorkTable.js'
import { updateSeriesTable } from './updateSeriesTable.js'
import { updateWorkTable } from './updateWorkTable.js'
import { updateUserSeriesTable } from './updateUserSeriesTable.js'
import { updateUserWorkTable } from './updateUserWorkTable.js'
import { updateWordWorkTable } from './updateWordWorkTable.js'
import { removePartialEntry } from './removePartialEntry.js'

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

  try {
    if (isPartOfSeries(workMetadata)) {
      const { seriesAlreadyExists, seriesId } = await updateSeriesTable(
        client,
        workMetadata.seriesTitle
      )

      if (!seriesAlreadyExists) {
        await updateUserSeriesTable(client, userId, seriesId)
      }

      workMetadata.seriesId = seriesId
      workMetadata.seriesAlreadyExists = seriesAlreadyExists
    }

    await updateWorkTable(client, workMetadata)
    await updateUserWorkTable(client, userId, workMetadata.workId)

    const { allAuthorIds, newAuthorIds } = await updateAuthorTable(
      client,
      workMetadata.authors
    )
    workMetadata.authorIds = allAuthorIds
    workMetadata.newAuthorIds = newAuthorIds

    await updateAuthorWorkTable(client, workMetadata.workId, allAuthorIds)

    await updateWordWorkTable(client, workMetadata, fullPath)
  } catch (err) {
    console.log(err)
    await removePartialEntry(client, workMetadata)
  } finally {
    const seriesInfo = await client.query('SELECT * FROM series')
    const workInfo = await client.query('SELECT * FROM work')
    const authorInfo = await client.query('SELECT * FROM author')
    const authorWorkInfo = await client.query('SELECT * FROM author_work')
    const user = await client.query('SELECT * FROM user_account')
    const words = await client.query('SELECT * FROM word_work')

    console.log(
      'series:',
      seriesInfo.rows,
      'work:',
      workInfo.rows,
      'author:',
      authorInfo.rows,
      'author_work:',
      authorWorkInfo.rows,
      'user:',
      user.rows,
      'words:',
      words.rows
    )

    await client.end()
  }
}
