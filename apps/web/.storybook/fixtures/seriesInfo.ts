import { GQL_ReadStatus } from '@repo/graphql-types'

import { type SeriesInfo } from '../../src/types/SeriesInfo'

export const mockSeriesInfo: SeriesInfo = {
  authors: ['臼井 儀人'],
  id: '321192a0-d330-4ead-b2db-2f40100e9046',
  isSeries: true,
  status: GQL_ReadStatus.Reading,
  title: 'クレヨンしんちゃん',
  volumes: [
    {
      volumeNumber: 1,
      id: '469e8ffc-4616-45c4-87dd-3673c91bd8b2',
      maxProgress: 120,
      progress: 120,
      status: GQL_ReadStatus.Read,
    },
    {
      volumeNumber: 2,
      id: 'ffaf662c-81c0-46dd-839a-ed88fbd41fb7',
      maxProgress: 120,
      progress: 120,
      status: GQL_ReadStatus.Abandoned,
    },
    {
      volumeNumber: 3,
      id: '65b4235a-f133-4f07-92a7-1df9b54084bc',
      maxProgress: 120,
      progress: 120,
      status: GQL_ReadStatus.Read,
    },
    {
      volumeNumber: 4,
      id: '20dd83f3-cfce-498e-b8f9-64562a7f1384',
      maxProgress: 120,
      progress: 60,
      status: GQL_ReadStatus.Reading,
    },
    {
      volumeNumber: 5,
      id: 'f3337cb4-3104-4647-894f-13fc949ed01d',
      maxProgress: 120,
      progress: 0,
      status: GQL_ReadStatus.WantToRead,
    },
    {
      volumeNumber: 6,
      id: 'd73b7e49-da07-4edd-9ee0-0666a95595ea',
      maxProgress: 120,
      progress: 0,
      status: GQL_ReadStatus.WantToRead,
    },
    {
      volumeNumber: 7,
      id: '8973fd32-6b3d-4e65-971c-0191a920b3b5',
      maxProgress: 120,
      progress: 0,
      status: GQL_ReadStatus.New,
    },
  ],
}
