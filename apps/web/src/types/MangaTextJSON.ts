type Coordinates = [number, number]

export type TextBoxData = {
  box: [number, number, number, number]
  vertical: boolean
  font_size: number
  lines_coords: [Coordinates, Coordinates, Coordinates, Coordinates][]
  lines: string[]
}

export type MangaTextJSON = {
  version: string
  img_width: number
  img_height: number
  blocks: TextBoxData[]
}
