export type NovelJSONContent = {
  type: keyof JSX.IntrinsicElements
  content?: (string | NovelJSONContent)[]
}
