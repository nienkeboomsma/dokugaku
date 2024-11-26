import classes from './Reading.module.css'
import { isJLPT, type Word } from '../../types/Word'
import JLPTLabel from './JLPTLabel'

export default function Reading({
  vocab,
  furigana,
}: {
  vocab: Word
  furigana?: boolean
}) {
  const kanji = vocab.info.kanji
  const kana = vocab.info.kana
  const jlpt = vocab.jlpt

  if (kanji.length === 0) {
    return (
      <span className={classes.containerWithoutFurigana}>
        {kana[0]}
        {isJLPT(jlpt) && <JLPTLabel jlpt={jlpt} />}
      </span>
    )
  }

  if (kanji.length > 0) {
    if (furigana) {
      return (
        <span className={classes.containerWithFurigana}>
          <ruby style={{ position: 'relative', top: '0.1875em' }}>
            {kanji[0]}
            <rt>{kana[0]}</rt>
          </ruby>
          {isJLPT(jlpt) && <JLPTLabel jlpt={jlpt} />}
        </span>
      )
    }

    return (
      <span className={classes.containerWithoutFurigana}>
        {`${kanji[0]}【${kana[0]}】`}
        {isJLPT(jlpt) && <JLPTLabel jlpt={jlpt} />}
      </span>
    )
  }
}
