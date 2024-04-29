import { GQL_ReadStatus } from '@repo/graphql-types'

type WorkCardCommon = {
  authors: string[]
  id: string
  knownVocab: number
  status: GQL_ReadStatus
  title: string
}

type WorkCardSeries = {
  firstVolumeId?: string
  series: true
  numberOfVolumes: number
} & WorkCardCommon

export const isSeries = (
  workCardInfo: WorkCardInfo
): workCardInfo is WorkCardSeries => {
  return workCardInfo.series
}

type WorkCardVolume = {
  series: false
} & WorkCardCommon

export const isVolume = (
  workCardInfo: WorkCardInfo
): workCardInfo is WorkCardVolume => {
  return !workCardInfo.series
}

export type WorkCardInfo = WorkCardSeries | WorkCardVolume
