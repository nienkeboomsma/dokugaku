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

type Word = {
  id: number
  reading: string
  pageNumber?: number
  sentenceIndex: number
  entryIndex: number
  componentIndex?: number
}

export type IchiranData = Array<Word>
