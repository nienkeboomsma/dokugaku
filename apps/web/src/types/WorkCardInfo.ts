import { GQL_ReadStatus } from '@repo/graphql-types'

type WorkCardInfoCommon = {
  authors: string[]
  id: string
  knownVocab?: number
  status?: GQL_ReadStatus
  title: string
}

type WorkCardInfoSeries = {
  firstVolumeId?: string
  series: true
  numberOfVolumes: number
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
