import { ReadStatus } from './Work'

type WorkCardInfoCommon = {
  authors: string[]
  id: string
  knownVocab: number
  status: ReadStatus
  title: string
}

type WorkCardInfoSeries = {
  firstVolumeId: string
  series: true
  volumeNumber: number
} & WorkCardInfoCommon

export const isSeries = (
  workCardInfo: WorkCardInfo
): workCardInfo is WorkCardInfoSeries => {
  return workCardInfo.series
}

type WorkCardInfoVolume = {
  series: false
} & WorkCardInfoCommon

export const isVolume = (
  workCardInfo: WorkCardInfo
): workCardInfo is WorkCardInfoVolume => {
  return !workCardInfo.series
}

export type WorkCardInfo = WorkCardInfoSeries | WorkCardInfoVolume
