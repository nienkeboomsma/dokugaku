import { type TransactionSql } from 'postgres'
import {
  isPartOfSeries,
  type WorkMetadata,
  type WorkMetadataSeries,
} from '../../utils/types.js'

type Work = {
  id: WorkMetadataSeries['workId']
  type: WorkMetadataSeries['workType']
  title: WorkMetadataSeries['workTitle']
  max_progress: WorkMetadataSeries['workMaxProgress']
  series_id?: WorkMetadataSeries['seriesId']
  volume_number?: WorkMetadataSeries['workVolumeNumber']
}

export async function updateWorkTable(
  sql: TransactionSql,
  workMetadata: WorkMetadata
) {
  const work: Work = {
    id: workMetadata.workId,
    max_progress: workMetadata.workMaxProgress,
    title: workMetadata.workTitle,
    type: workMetadata.workType,
  }

  if (isPartOfSeries(workMetadata)) {
    if (!workMetadata.seriesId) {
      throw new Error('No series ID provided.')
    }

    work.series_id = workMetadata.seriesId
    work.volume_number = workMetadata.workVolumeNumber
  }

  await sql`INSERT INTO work ${sql(work)}`
}
