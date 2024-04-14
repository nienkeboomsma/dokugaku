import { ReadStatus } from './Work'
import { Vocab } from './Vocab'

export type WorkInfo = {
  id: string
  title: string
  authors: string[]
  status: ReadStatus
  progress: number
  maxProgress: number
  vocab: Vocab[]
}
