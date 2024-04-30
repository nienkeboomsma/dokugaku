import { GQL_WorkType } from '@repo/graphql-types'

import { ExistingSeries } from '../types/ExistingSeries'

export const mockExistingSeries: ExistingSeries[] = [
  [
    {
      authors: new Set(['鳥山 明', 'オオイシ ナホ']),
      nextVolumeNumber: 5,
      title: 'ドラゴンボールSD',
      volumeNumbers: [1, 2, 3, 4],
      workTypes: new Set([GQL_WorkType.Manga]),
    },
  ],
  [
    {
      authors: new Set(['杉山 亮']),
      nextVolumeNumber: 2,
      title: 'にゃんにゃん探偵団',
      volumeNumbers: [1, 3],
      workTypes: new Set([GQL_WorkType.Novel]),
    },
    {
      authors: new Set(['香月 美夜']),
      nextVolumeNumber: 5,
      title: '本好きの下剋上',
      volumeNumbers: [1, 2, 3, 4],
      workTypes: new Set([GQL_WorkType.Novel]),
    },
  ],
]
