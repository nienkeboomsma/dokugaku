export type Vocab = {
  id: number
  info: {
    kanji: string[]
    kana: string[]
    meaning: string[][]
  }
  frequency?: number
  ignored?: boolean
  volumeNumber?: number
  pageNumber?: number
  sentenceNumber?: number
  entryNumber?: number
  componentNumber?: number
}
