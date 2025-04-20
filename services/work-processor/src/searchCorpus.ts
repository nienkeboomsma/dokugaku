import { NextFunction, Response } from 'express'

import { SearchCorpusRequest } from './utils/types.js'
import { runIchiran } from './utils/utils.js'
import sql from './db/sql.js'
import { findWordsInWorks } from './db/words/findWordsInWorks.js'

type Hit = {
  id: string
  title: string
  URLs: string[]
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
      let urls: string[] = []

      switch (hit.status) {
        case 'read':
          urls = hit.pageNumbers.map(
            (pageNumber) =>
              `http://${process.env.HOST_IP}/reader/${hit.workType}/${hit.id}`
          )
        case 'reading':
        case 'abandoned':
          urls = hit.pageNumbers
            .filter((pageNumber) => pageNumber <= hit.progress)
            .map(
              (pageNumber) =>
                `http://${process.env.HOST_IP}:${process.env.WEB_PORT}/reader/${hit.workType}/${hit.id}?${hit.workType === 'manga' ? 'page' : 'paragraph'}=${pageNumber}`
            )
      }

      return {
        id: hit.id,
        title: hit.title,
        URLs: urls,
      }
    })
    .filter((hit) => hit.URLs.length > 0)

  return res.status(200).json(body)
}
