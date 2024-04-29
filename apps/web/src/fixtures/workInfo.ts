import { GQL_ReadStatus } from '@repo/graphql-types'

import { type WorkInfo } from '../types/WorkInfo'

export const mockWorkInfo: WorkInfo = {
  id: 'd73b7e49-da07-4edd-9ee0-0666a95595ea',
  title: 'クレヨンしんちゃん 6',
  authors: ['臼井 儀人'],
  status: GQL_ReadStatus.Reading,
  progress: 47,
  maxProgress: 120,
}
