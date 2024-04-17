import pg from 'pg'

import { WorkMetadata, isPartOfSeries } from '../utils/types.js'

export async function removePartialEntry(
  client: pg.Client,
  workMetadata: WorkMetadata
) {
  await client.query('DELETE FROM work WHERE id = $1;', [workMetadata.workId])
  console.log(`Removed work ${workMetadata.workTitle} from database`)

  if (
    isPartOfSeries(workMetadata) &&
    workMetadata.seriesAlreadyExists &&
    workMetadata.seriesId
  ) {
    await client.query('DELETE FROM series WHERE id = $1;', [
      workMetadata.seriesId,
    ])
    console.log(`Removed series ${workMetadata.seriesTitle} from database`)
  }

  if (workMetadata.newAuthorIds && workMetadata.newAuthorIds.length > 0) {
    await client.query('DELETE FROM author WHERE id = ANY($1)', [
      workMetadata.newAuthorIds,
    ])
    console.log(
      `Removed new author(s) ${workMetadata.newAuthorIds} from database`
    )
  }
}
