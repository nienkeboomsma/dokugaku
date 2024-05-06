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
  isSeries: true
  numberOfVolumes: number
} & WorkCardCommon

export const isSeries = (
  workCardInfo: WorkCardInfo
): workCardInfo is WorkCardSeries => {
  return workCardInfo.isSeries
}

type WorkCardVolume = {
  isSeries: false
} & WorkCardCommon

export const isVolume = (
  workCardInfo: WorkCardInfo
): workCardInfo is WorkCardVolume => {
  return !workCardInfo.isSeries
}

export type WorkCardInfo = WorkCardSeries | WorkCardVolume
