import sql from './sql.js'
import { isPartOfSeries, type WorkMetadata } from '../utils/types.js'
import { updateAuthorTable } from './updateAuthorTable.js'
import { updateAuthorWorkTable } from './updateAuthorWorkTable.js'
import { updateSeriesTable } from './updateSeriesTable.js'
import { updateUserSeriesTable } from './updateUserSeriesTable.js'
import { updateUserWorkTable } from './updateUserWorkTable.js'
import { updateWordWorkTable } from './updateWordWorkTable.js'
import { updateWorkTable } from './updateWorkTable.js'

export async function insertIntoDatabase(
  workMetadata: WorkMetadata,
  userId: string,
  fullPath: string
) {
  sql.begin(async (sql) => {
    if (isPartOfSeries(workMetadata)) {
      const { seriesId } = await updateSeriesTable(
        sql,
        workMetadata.seriesTitle
      )

      await updateUserSeriesTable(sql, userId, seriesId)

      workMetadata.seriesId = seriesId
    }

    await updateWorkTable(sql, workMetadata)
    const authorIds = await updateAuthorTable(sql, workMetadata.authors)
    await updateUserWorkTable(sql, userId, workMetadata.workId)
    await updateAuthorWorkTable(sql, workMetadata.workId, authorIds)
    await updateWordWorkTable(sql, workMetadata, fullPath)

    console.log('Work was successfully added to the database')
  })
}
