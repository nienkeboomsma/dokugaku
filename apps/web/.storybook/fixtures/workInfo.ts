import { GQL_ReadStatus } from '@repo/graphql-types'

import { type WorkInfo } from '../../src/types/WorkInfo'

export const mockWorkInfo: WorkInfo[] = [
  {
    authors: ['臼井 儀人'],
    id: 'd73b7e49-da07-4edd-9ee0-0666a95595ea',
    maxProgress: 120,
    progress: 47,
    isSeries: false,
    seriesId: '321192a0-d330-4ead-b2db-2f40100e9046',
    seriesTitle: 'クレヨンしんちゃん',
    status: GQL_ReadStatus.Reading,
    title: 'クレヨンしんちゃん 6',
  },
  {
    authors: ['赤川 次郎'],
    id: '43b58d3f-dc4a-46a7-b866-bf5131a628de',
    maxProgress: 120,
    progress: 0,
    isSeries: false,
    status: GQL_ReadStatus.WantToRead,
    title: 'セーラー服と機関銃',
  },
]
