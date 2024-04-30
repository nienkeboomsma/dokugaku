import { IncomingMessage } from 'node:http'
// TODO: fix this error, so I can use GraphQLError
// import { GraphQLError } from 'graphql'

import Author from './sources/Author.js'
import Series from './sources/Series.js'
import Word from './sources/Word.js'
import Work from './sources/Work.js'

export type GQL_Context = {
  userId: string
  dataSources: {
    author: Author
    series: Series
    word: Word
    work: Work
  }
}

export async function createContext({
  req,
}: {
  req: IncomingMessage
}): Promise<GQL_Context> {
  const token = req.headers.authorization || ''
  const userId = token.split(' ')[1]

  console.log(userId)

  if (!userId) {
    // throw new GraphQLError('User is not authenticated', {
    //   extensions: {
    //     code: 'UNAUTHENTICATED',
    //     http: { status: 401 },
    //   },
    // })
    throw new Error('User is not authenticated')
  }

  return {
    userId,
    dataSources: {
      author: new Author(),
      series: new Series(),
      word: new Word(),
      work: new Work(),
    },
  }
}
