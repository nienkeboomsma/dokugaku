import { GQL_ReadStatus } from '@repo/graphql-types'

import { type WorkCardInfo } from '../../src/types/WorkCardInfo'

export const mockWorkCards: WorkCardInfo[] = [
  {
    authors: ['臼井 儀人'],
    firstVolumeId: '469e8ffc-4616-45c4-87dd-3673c91bd8b2',
    id: '321192a0-d330-4ead-b2db-2f40100e9046',
    knownVocab: 83,
    series: true,
    status: GQL_ReadStatus.Reading,
    title: 'クレヨンしんちゃん',
    numberOfVolumes: 7,
  },
  {
    authors: ['赤川 次郎'],
    id: '43b58d3f-dc4a-46a7-b866-bf5131a628de',
    knownVocab: 93,
    series: false,
    status: GQL_ReadStatus.WantToRead,
    title: 'セーラー服と機関銃',
  },
  {
    authors: ['あらゐ けいいち'],
    id: '03b16794-4472-4ac3-b018-537398f83332',
    knownVocab: 87,
    series: false,
    status: GQL_ReadStatus.Abandoned,
    title: '水たまりで息をする',
  },
  {
    authors: ['オオイシ ナホ', '鳥山 明'],
    id: 'd548998c-849a-4418-aa8a-00a4e7b8f584',
    knownVocab: 87,
    status: GQL_ReadStatus.Read,
    series: true,
    title: 'ドラゴンボールSD',
    numberOfVolumes: 3,
  },
  {
    authors: ['村田 沙耶香'],
    id: 'a1f5e015-415a-4031-9c62-1674e1221c88',
    knownVocab: 91,
    series: false,
    status: GQL_ReadStatus.New,
    title: 'コンビニ人間',
  },
]
