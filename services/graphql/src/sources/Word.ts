import { WordCountModel } from '../models/WordCountModel.js'
import { WordModel } from '../models/WordModel.js'
import WordQuery from '../queries/WordQuery.js'

type GetWordInput = {
  seriesIdInWhichIgnored?: string
  userId?: string
  wordId: number
  workIdInWhichIgnored?: string
  workIds?: string[]
}

type GetWordCountInput = {
  rowCountOnly: true
} & GetWordsInputCommon

type GetWordEntriesInput = {
  rowCountOnly?: false
} & GetWordsInputCommon

type GetWordsInputCommon = {
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
}

type GetWordsInput = GetWordCountInput | GetWordEntriesInput

class Word {
  async getWord(input: GetWordInput) {
    const wordQuery = new WordQuery({
      ...input,
      return: 'single',
    })
    const [word] = await wordQuery.getQuery()
    return word
  }

  /* eslint-disable no-dupe-class-members */
  // TODO: set up ESLint to deal with TS better
  async getWords(input: GetWordCountInput): Promise<[WordCountModel]>
  async getWords(input: GetWordEntriesInput): Promise<WordModel[]>
  async getWords(
    input: GetWordsInput = {}
  ): Promise<WordModel[] | [WordCountModel]> {
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
