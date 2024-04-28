import { Vocab } from '../../types/Vocab'

export default function Reading({
  vocab,
  furigana,
}: {
  vocab: Vocab
  furigana?: boolean
}) {
  const kanji = vocab.info.kanji
  const kana = vocab.info.kana

  if (kanji.length === 0) {
    return kana[0]
  }

  if (kanji.length > 0) {
    if (furigana) {
      return (
        <ruby style={{ position: 'relative', top: '0.1875em' }}>
          {kanji[0]}
          <rt>{kana[0]}</rt>
        </ruby>
      )
    }

    return `${kanji[0]}【${kana[0]}】`
  }
}
