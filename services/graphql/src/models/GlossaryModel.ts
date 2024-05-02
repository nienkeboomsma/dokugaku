export type GlossaryModel = {
  id: string
  info: string
  frequency: number
  volumeNumber: number | null
  pageNumber: number
  sentenceNumber: number
  entryNumber: number
  componentNumber: number | null
  ignored: boolean
}
