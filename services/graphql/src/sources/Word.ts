import WordQuery from '../queries/WordQuery.js'

class Word {
  async getWord(input: {
    seriesIdInWhichIgnored?: string
    userId?: string
    wordId: number
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
      wordIds?: number[]
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
      const words = await wordQuery.getQuery()
      return words ?? []
    }

    const wordQuery = new WordQuery({
      ...input,
      return: 'all' as const,
    })
    const words = await wordQuery.getQuery()
    return words ?? []
  }
}

export default Word

export type WordType = typeof Word
