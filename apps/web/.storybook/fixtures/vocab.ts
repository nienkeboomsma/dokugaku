import { type Word } from '../../src/types/Word'

export const mockVocab: Word[] = [
  {
    id: '1270010',
    ignored: false,
    info: {
      kanji: ['後輩'],
      kana: ['こうはい'],
      meaning: [
        ['junior (at work, school, etc.)', 'younger people', 'younger student'],
      ],
    },
    frequency: 23,
    pageNumber: 1,
    sentenceNumber: 2,
    entryNumber: 1,
  },
  {
    id: '1430000',
    ignored: false,
    info: {
      kanji: ['長者'],
      kana: ['ちょうじゃ', 'ちょうしゃ', 'ちょうざ'],
      meaning: [
        ['millionaire'],
        ["one's superior", "one's elder", "one's senior"],
        ['virtuous and gentle person'],
        ['female owner of a whorehouse in a post town'],
        ['chief of a post town'],
      ],
    },
    frequency: 4,
    pageNumber: 3,
    sentenceNumber: 1,
    entryNumber: 2,
    componentNumber: 2,
  },
  {
    id: '1144260',
    ignored: true,
    info: {
      kanji: [],
      kana: ['ルンペン'],
      meaning: [['loafer', 'free-loader', 'tramp', 'unemployed person']],
    },
    frequency: 134,
    pageNumber: 2,
    sentenceNumber: 2,
    entryNumber: 3,
  },
  {
    id: '1388410',
    ignored: false,
    info: {
      kanji: ['先輩'],
      kana: ['せんぱい'],
      meaning: [
        [
          'senior (at work or school)',
          'superior',
          'elder',
          'older graduate',
          'progenitor',
          'old-timer',
        ],
      ],
    },
    frequency: 254,
    pageNumber: 1,
    sentenceNumber: 1,
    entryNumber: 3,
  },
  {
    id: '1429630',
    ignored: false,
    info: {
      kanji: ['跳ね回る', 'はね回る', '跳ねまわる'],
      kana: ['はねまわる'],
      meaning: [
        ['to jump about', 'to jump around', 'to bounce about', 'to romp about'],
      ],
    },
    frequency: 12,
    pageNumber: 3,
    sentenceNumber: 1,
    entryNumber: 2,
    componentNumber: 1,
  },
]
