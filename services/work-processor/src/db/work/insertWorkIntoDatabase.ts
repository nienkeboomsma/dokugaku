import sql from '../sql.js'
import { isPartOfSeries, type WorkMetadata } from '../../utils/types.js'
import { updateAuthorTable } from './updateAuthorTable.js'
import { updateAuthorWorkTable } from './updateAuthorWorkTable.js'
import { updateSeriesTable } from './updateSeriesTable.js'
import { updateUserSeriesTable } from './updateUserSeriesTable.js'
import { updateUserWorkTable } from './updateUserWorkTable.js'
import { updateWordWorkTable } from './updateWordWorkTable.js'
import { updateWorkTable } from './updateWorkTable.js'
import { updateWorkWordCounts } from './updateWorkWordCounts.js'
import { updateSeriesWordCounts } from './updateSeriesWordCounts.js'

export async function insertWorkIntoDatabase(
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
    await updateWorkWordCounts(sql, workMetadata.workId)

    if (isPartOfSeries(workMetadata)) {
      if (!workMetadata.seriesId) {
        throw new Error('No series ID provided.')
      }

      await updateSeriesWordCounts(sql, workMetadata.seriesId)
    }

    console.log(
      `${workMetadata.workTitle} ・ ✅ Work was successfully added to the database ✅`
    )
  })
}
