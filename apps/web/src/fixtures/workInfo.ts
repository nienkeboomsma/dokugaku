import { GQL_ReadStatus } from '@repo/graphql-types'

import { type WorkInfo } from '../types/WorkInfo'

export const mockWorkInfo: WorkInfo = {
  authors: ['臼井 儀人'],
  id: 'd73b7e49-da07-4edd-9ee0-0666a95595ea',
  maxProgress: 120,
  progress: 47,
  series: false,
  status: GQL_ReadStatus.Reading,
  title: 'クレヨンしんちゃん 6',
}
