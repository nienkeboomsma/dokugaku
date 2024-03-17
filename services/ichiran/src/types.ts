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

type ConjCommon = {
  prop: Array<Prop>
  readok: boolean
}

type Conj = ConjCommon & {
  reading: string
  gloss: Array<Gloss>
}

type ConjVia = ConjCommon & {
  via: [Conj]
}

export const hasVia = (conj: Conj | ConjVia): conj is ConjVia => {
  return 'via' in conj
}

type WordCommon = {
  reading: string
  text: string
  kana: string
  score: number
}

type UnconjugatedWord = WordCommon & {
  seq: number
  gloss?: Array<Gloss>
  suffix?: string
  conj: never[]
}

export const isUnconjugatedWord = (
  word: NonCompoundWord
): word is UnconjugatedWord => {
  return word.conj.length === 0
}

type ConjugatedWord = WordCommon & {
  seq: number
  conj: [Conj | ConjVia]
} & {
  gloss: never
  suffix: never
}

export const isConjugatedWord = (
  word: NonCompoundWord
): word is ConjugatedWord => {
  return word.conj.length > 0
}

export type NonCompoundWord = UnconjugatedWord | ConjugatedWord

export const isNonCompoundWord = (word: Word): word is NonCompoundWord => {
  return 'seq' in word
}

type CompoundWord = WordCommon & {
  compound: string[]
  components: Array<UnconjugatedWord | ConjugatedWord>
}

export const isCompoundWord = (word: Word): word is CompoundWord => {
  return 'compound' in word
}

type Word = NonCompoundWord | CompoundWord | WordCommon

type Alternatives = {
  alternative: Word[]
}

type EntryContent = Word | Alternatives

export const hasAlternatives = (
  entryContent: EntryContent
): entryContent is Alternatives => {
  return 'alternative' in entryContent
}

type Entry = [number, EntryContent, []]

type Sentence = [[Array<Entry>, number]]

type Punctuation = string

export type Segmentation = Array<Sentence | Punctuation>

export const isSentence = (
  element: Segmentation[number]
): element is Sentence => Array.isArray(element)

export type ProcessedWord = {
  id: number
  reading: string
  sentenceIndex: number
  entryIndex: number
  componentIndex?: number
}
