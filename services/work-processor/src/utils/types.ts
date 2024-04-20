declare global {
  // eslint-disable-next-line no-unused-vars
  namespace Express {
    // eslint-disable-next-line no-unused-vars
    interface Request {
      body: {
        authors: string[]
        mokuro: 'true' | 'false'
        series?: string
        userId: string
        volumeNumber?: number
        title: string
      }
      folderName: string
    }
  }
}

type LineCoordinates = [
  [number, number],
  [number, number],
  [number, number],
  [number, number],
]

type Block = {
  box: [number, number, number, number]
  vertical: boolean
  font_size: number
  lines_coords: Array<LineCoordinates>
  lines: string[]
}

export type MokuroData = {
  version: string
  img_width: number
  img_height: number
  blocks: Array<Block>
}

export type NovelTextJson = {
  type: string
  content: Array<string | NovelTextJson>
}

export type Word = {
  id: number
  reading: string
  pageNumber: number
  sentenceNumber: number
  entryNumber: number
  componentNumber?: number
}

export type IchiranData = Array<Word>

export interface WorkMetadata {
  authors: string[]
  seriesId?: string
  seriesTitle?: string
  workId: string
  workMaxProgress: string
  workTitle: string
  workType: 'manga' | 'novel'
  workVolumeNumber?: number
}

export interface WorkMetadataSeries extends WorkMetadata {
  seriesTitle: string
  workVolumeNumber: number
}

export const isPartOfSeries = (
  workMetadata: WorkMetadata
): workMetadata is WorkMetadataSeries => {
  if (workMetadata.seriesTitle && workMetadata.workVolumeNumber) return true
  return false
}

export const isString = (param: any): param is string => {
  return typeof param === 'string'
}

export const isNumber = (param: any): param is number => {
  return typeof param === 'number'
}
