type Prop = {
  pos: string
  type: string
  fml: boolean
}

type Gloss = {
  pos: string
  gloss: string
  info?: string
}

type Conj = {
  prop: Array<Prop>
  reading: string
  gloss: Array<Gloss>
  readok: boolean
}

type WordInfoCommon = {
  reading: string
  text: string
  kana: string
  score: number
  seq: number
  gloss: Array<Gloss>
}

export type WordInfoUnconjugated = WordInfoCommon & {
  conj: []
}

export type WordInfoConjugated = WordInfoCommon & {
  conj: Array<Conj>
}

export type WordInfo = WordInfoUnconjugated | WordInfoConjugated

export const isUnconjugated = (
  wordInfo: WordInfo
): wordInfo is WordInfoUnconjugated => {
  return wordInfo.conj.length === 0
}

export type Entry = [number, WordInfo, []]

export type Sentence = [[Array<Entry>, number]]

export type Segmentation = Array<Sentence | string>

export const isSentence = (
  element: Segmentation[number]
): element is Sentence => Array.isArray(element)
