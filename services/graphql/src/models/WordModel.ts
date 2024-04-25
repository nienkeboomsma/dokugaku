export type WordModel = {
  id: string
  info: string
  ignored: boolean | null
  excluded: boolean | null
  known: boolean | null
  frequency: number
  volumeNumber: number | null
  pageNumber: number
  sentenceNumber: number
  entryNumber: number
  componentNumber: number | null
}
