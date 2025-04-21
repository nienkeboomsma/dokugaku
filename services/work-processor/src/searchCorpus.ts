import { NextFunction, Response } from 'express'

import { SearchCorpusRequest } from './utils/types.js'
import { runIchiran } from './utils/utils.js'
import sql from './db/sql.js'
import { findWordsInWorks } from './db/words/findWordsInWorks.js'

type Hit = {
  id: string
  hitCount: number
  title: string
  url: string
}

type ResponseBody = {
  hits: Hit[]
}

export async function searchCorpus(
  req: SearchCorpusRequest,
  res: Response,
  next: NextFunction
) {
  const {
    body: { query, userId },
  } = req

  const body: ResponseBody = { hits: [] }

  const wordIds = await runIchiran(query, 'idsOnly')

  if (!wordIds || wordIds.length == 0) {
    return res.status(200).json(body)
  }

  const hits = await findWordsInWorks(userId, new Set(wordIds))

  body.hits = hits
    .map<Hit>((hit) => {
      const uniqueHitPageNumbers = [...new Set(hit.pageNumbers)].sort(
        (a, b) => a - b
      )
      let readPageNumbers: number[] = []

      switch (hit.status) {
        case 'read':
          readPageNumbers = uniqueHitPageNumbers
        case 'reading':
        case 'abandoned':
          readPageNumbers = uniqueHitPageNumbers.filter(
            (pageNumber) => pageNumber <= hit.progress
          )
      }

      return {
        hitCount: readPageNumbers.length,
        id: hit.id,
        title: hit.title,
        url: `http://${process.env.HOST_IP}:${process.env.WEB_PORT}/reader/${hit.workType}/${hit.id}?hits=${readPageNumbers.join(',')}`,
      }
    })
    .filter((hit) => hit.hitCount > 0)

  return res.status(200).json(body)
}
