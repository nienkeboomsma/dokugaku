import classes from './Meaning.module.css'
import { type Word } from '../../types/Word'
import InlineUnorderedList from '../InlineUnorderedList'

function MeaningsList({ meanings }: { meanings: string[][] }) {
  return (
    <ol className={classes.meaningsList}>
      {meanings.map((meaning, index) => (
        <li className={classes.meaning} key={index}>
          <InlineUnorderedList listItems={meaning} />
        </li>
      ))}
    </ol>
  )
}

export default function Meaning({ vocab }: { vocab: Word }) {
  const meanings = vocab.info.meaning

  if (vocab.info.meaning.length === 1) {
    const synonyms = vocab.info.meaning[0] ?? []
    return <InlineUnorderedList listItems={synonyms} />
  }

  return <MeaningsList meanings={meanings} />
}
