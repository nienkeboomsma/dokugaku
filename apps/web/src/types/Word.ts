import { ArrayToStringLiteral } from './utility'

const JLPTlevels = ['N5', 'N4', 'N3', 'N2', 'N1'] as const

export type JLPT = ArrayToStringLiteral<typeof JLPTlevels>

export function isJLPT(param: any): param is JLPT {
  if (typeof param !== 'string') return false
  return JLPTlevels.findIndex((item) => item === param) > -1
}

export type Word = {
  id: string
  info: {
    kanji: string[]
    kana: string[]
    meaning: string[][]
  }
  jlpt?: string | null
  frequency?: number
  ignored?: boolean
  volumeNumber?: number | null
  pageNumber?: number
  sentenceNumber?: number
  entryNumber?: number
  componentNumber?: number | null
}
