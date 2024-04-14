import { ReadStatus } from './Work'
import { Vocab } from './Vocab'

export type VolumeInfo = {
  id: string
  maxProgress: number
  progress: number
  status: ReadStatus
  volumeNumber: number
}

export type SeriesInfo = {
  authors: string[]
  id: string
  status: ReadStatus
  title: string
  volumes: VolumeInfo[]
  vocab: Vocab[]
}
