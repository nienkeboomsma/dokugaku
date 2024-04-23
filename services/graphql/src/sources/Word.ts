import getWordsQuery from './wordsQuery.js'

class Word {
  async getWord(input: {
    seriesIdInWhichIgnored?: string
    userId?: string
    wordId: string
    workIdInWhichIgnored?: string
    workIds?: string[]
  }) {
    const [word] = await getWordsQuery({
      ...input,
      return: 'single',
    })
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
      return getWordsQuery({
        ...input,
        return: 'multiple' as const,
        wordIds: input.wordIds,
      })
    }

    return getWordsQuery({
      ...input,
      return: 'all' as const,
    })
  }
}

export default Word
