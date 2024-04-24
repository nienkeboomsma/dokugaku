import WordQuery from '../queries/WordQuery.js'

class Word {
  async getWord(input: {
    seriesIdInWhichIgnored?: string
    userId?: string
    wordId: string
    workIdInWhichIgnored?: string
    workIds?: string[]
  }) {
    const wordQuery = new WordQuery({
      ...input,
      return: 'single',
    })
    const [word] = await wordQuery.getQuery()
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
      const wordQuery = new WordQuery({
        ...input,
        return: 'multiple' as const,
        wordIds: input.wordIds,
      })
      return wordQuery.getQuery()
    }

    const wordQuery = new WordQuery({
      ...input,
      return: 'all' as const,
    })
    return wordQuery.getQuery()
  }
}

export default Word
