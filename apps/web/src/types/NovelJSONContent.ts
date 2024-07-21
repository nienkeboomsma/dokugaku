import { ImgHTMLAttributes } from 'react'

export type NovelJSONContent = {
  type: keyof JSX.IntrinsicElements
  attributes?: ImgHTMLAttributes<HTMLImageElement>
  content?: (string | NovelJSONContent)[]
}
