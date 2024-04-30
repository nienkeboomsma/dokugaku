export type WordModel = {
  id: string
  info: string
  ignored: boolean | null
  excluded: boolean
  known: boolean
  frequency: number
  volumeNumber: number | null
  pageNumber: number
  sentenceNumber: number
  entryNumber: number
  componentNumber: number | null
}
