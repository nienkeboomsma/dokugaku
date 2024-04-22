import getWordsQuery from './wordsQuery.js'

class Word {
  async getWord(input: {
    userId?: string
    wordId: string
    workIds?: string[]
  }) {
    const [word] = await getWordsQuery({
      return: 'single',
      userId: input.userId,
      wordId: input.wordId,
      workIds: input.workIds,
    })
    return word
  }

  async getWords(
    input: {
      distinctOnly?: boolean
      userId?: string
      wordIds?: string[]
      workIds?: string[]
    } = {}
  ) {
    if (input.wordIds && input.wordIds.length > 0) {
      return getWordsQuery({
        distinctOnly: input.distinctOnly,
        return: 'multiple' as const,
        userId: input.userId,
        wordIds: input.wordIds,
        workIds: input.workIds,
      })
    }

    return getWordsQuery({
      distinctOnly: input.distinctOnly,
      return: 'all' as const,
      userId: input.userId,
      workIds: input.workIds,
    })
  }
}

export default Word
