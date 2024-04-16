import pg from 'pg'
import { WorkMetadata, isPartOfSeries } from '../utils/types.js'

export async function updateWorkTable(
  client: pg.Client,
  workMetadata: WorkMetadata
) {
  if (isPartOfSeries(workMetadata)) {
    console.log('part of series')
    if (!workMetadata.seriesId) {
      throw new Error('No series ID provided.')
    }

    await client.query(
      'INSERT INTO work(id, type, title, series_id, volume_number, max_progress) VALUES ($1, $2, $3, $4, $5, $6)',
      [
        workMetadata.workId,
        workMetadata.workType,
        workMetadata.workTitle,
        workMetadata.seriesId,
        workMetadata.workVolumeNumber,
        workMetadata.workMaxProgress,
      ]
    )
  }

  if (!isPartOfSeries(workMetadata)) {
    console.log('not part of series')
    await client.query(
      'INSERT INTO work(id, type, title, max_progress) VALUES ($1, $2, $3, $4)',
      [
        workMetadata.workId,
        workMetadata.workType,
        workMetadata.workTitle,
        workMetadata.workMaxProgress,
      ]
    )
  }
}
