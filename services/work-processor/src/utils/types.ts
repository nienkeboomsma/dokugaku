declare global {
  // eslint-disable-next-line no-unused-vars
  namespace Express {
    // eslint-disable-next-line no-unused-vars
    interface Request {
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

type Word = {
  id: number
  reading: string
  pageNumber?: number
  sentenceIndex: number
  entryIndex: number
  componentIndex?: number
}

export type IchiranData = Array<Word>

type WorkMetadataCommon = {
  workId: string
  workType: 'manga' | 'novel'
  workTitle: string
  workMaxProgress: string
  authors: string[]
  authorIds?: string[]
}

export type WorkMetadataNotSeries = WorkMetadataCommon & {
  seriesTitle: undefined
  workVolumeNumber: undefined
}

export type WorkMetadataSeries = WorkMetadataCommon & {
  seriesAlreadyExists?: boolean
  seriesId?: string
  seriesTitle: string
  workVolumeNumber: string
}

export type WorkMetadata = WorkMetadataNotSeries | WorkMetadataSeries

export const isString = (param: any): param is string => {
  return typeof param === 'string'
}

export const isPartOfSeries = (
  workMetadata: WorkMetadata
): workMetadata is WorkMetadataSeries => {
  if (workMetadata.seriesTitle && workMetadata.workVolumeNumber) return true
  return false
}
