import WordsQuery from '../queries/WordQuery.js'

class Word {
  async getWord(input: {
    seriesIdInWhichIgnored?: string
    userId?: string
    wordId: string
    workIdInWhichIgnored?: string
    workIds?: string[]
  }) {
    const wordsQuery = new WordsQuery({
      ...input,
      return: 'single',
    })
    const [word] = await wordsQuery.getQuery()
    return word
  }

  async getWords(
    input: {
      distinctOnly?: boolean
      excluded?: boolean
      ignored?: boolean
      known?: boolean
      minFrequency?: number
      minPageNumber?: number
      pageNumber?: number
      seriesIdInWhichIgnored?: string
      userId?: string
      wordIds?: string[]
      workIdInWhichIgnored?: string
      workIds?: string[]
    } = {}
  ) {
    if (input.wordIds && input.wordIds.length > 0) {
      const wordsQuery = new WordsQuery({
        ...input,
        return: 'multiple' as const,
        wordIds: input.wordIds,
      })
      return wordsQuery.getQuery()
    }

    const wordsQuery = new WordsQuery({
      ...input,
      return: 'all' as const,
    })
    return wordsQuery.getQuery()
  }
}

export default Word
