export type Word = {
  id: string
  info: {
    kanji: string[]
    kana: string[]
    meaning: string[][]
  }
  frequency?: number
  ignored?: boolean
  volumeNumber?: number | null
  pageNumber?: number
  sentenceNumber?: number
  entryNumber?: number
  componentNumber?: number | null
}
