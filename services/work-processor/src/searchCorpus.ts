import { NextFunction, Response } from 'express'

import { SearchCorpusRequest } from './utils/types.js'
import { runIchiran } from './utils/utils.js'
import { findWordsInWorks } from './db/words/findWordsInWorks.js'

type Hit = {
  id: string
  title: string
  allHits: {
    hitCount: number
    url: string
  }
  readHits: {
    hitCount: number
    url: string
  }
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

  body.hits = hits.map<Hit>((hit) => {
    const baseURL = `http://${process.env.HOST_IP}:${process.env.WEB_PORT}/reader/${hit.workType}/${hit.id}?hits=`
    const uniquePageNumbers = [...new Set(hit.pageNumbers)].sort(
      (a, b) => a - b
    )
    let readPageNumbers: number[] = []

    switch (hit.status) {
      case 'read':
        readPageNumbers = uniquePageNumbers
      case 'reading':
      case 'abandoned':
        readPageNumbers = uniquePageNumbers.filter(
          (pageNumber) => pageNumber <= hit.progress
        )
    }

    return {
      id: hit.id,
      title: hit.title,
      allHits: {
        hitCount: uniquePageNumbers.length,
        url:
          uniquePageNumbers.length > 0
            ? baseURL + uniquePageNumbers.join(',')
            : '',
      },
      readHits: {
        hitCount: readPageNumbers.length,
        url:
          readPageNumbers.length > 0 ? baseURL + readPageNumbers.join(',') : '',
      },
    }
  })

  return res.status(200).json(body)
}
