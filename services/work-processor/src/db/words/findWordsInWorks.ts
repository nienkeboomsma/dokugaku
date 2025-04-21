import { WorkMetadata } from '../../utils/types.js'
import sql from '../sql.js'

type Hit = {
  id: string
  pageNumbers: number[]
  progress: number
  status: 'abandoned' | 'new' | 'read' | 'reading' | 'want_to_read'
  title: WorkMetadata['workTitle']
  workType: WorkMetadata['workType']
}

export async function findWordsInWorks(userId: string, wordIds: Set<number>) {
  return sql<Hit[]>`
    SELECT
      w.id,
      ARRAY_AGG(ww.page_number ORDER BY ww.page_number ASC) AS "pageNumbers",
      uw.current_progress AS "progress",
      uw.status,
      w.title,
      w.type AS "workType"
    FROM
      word_work ww
    JOIN work w
      ON w.id = ww.work_id
    JOIN user_work uw
      ON w.id = uw.work_id
    LEFT JOIN series s
      ON s.id = w.series_id
    WHERE word_id IN ${sql([...wordIds])}
      AND uw.user_id = ${userId}
    GROUP BY
      w.id, s.title, w.volume_number, uw.current_progress, uw.status
    ORDER BY
      COALESCE(s.title, w.title) ASC,
      CASE WHEN s.title IS NOT NULL THEN w.volume_number ELSE NULL END ASC;
  `
}
