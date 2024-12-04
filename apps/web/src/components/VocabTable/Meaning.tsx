import { memo } from 'react'

import classes from './Meaning.module.css'
import { type Word } from '../../types/Word'
import InlineUnorderedList from '../InlineUnorderedList'

function MeaningsList({ meanings }: { meanings: string[][] }) {
  return (
    <ol className={classes.meaningsList}>
      {meanings.map((meaning, index) => (
        <li className={classes.meaning} key={index}>
          <InlineUnorderedList display='inline-block' listItems={meaning} />
        </li>
      ))}
    </ol>
  )
}

function Meaning({ vocab }: { vocab: Word }) {
  const meanings = vocab.info.meaning

  if (vocab.info.meaning.length === 1) {
    const synonyms = vocab.info.meaning[0] ?? []
    return <InlineUnorderedList display='inline-block' listItems={synonyms} />
  }

  return <MeaningsList meanings={meanings} />
}

export default memo(Meaning)
