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
    WHERE word_id IN ${sql([...wordIds])}
      AND uw.user_id = ${userId}
    GROUP BY
      w.id, uw.current_progress, uw.status
    ORDER BY
      w.title ASC;
  `
}
