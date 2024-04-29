import { Spoiler } from '@mantine/core'
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react'

import classes from './IgnoredWords.module.css'
import { type Word } from '../../types/Word'
import SectionHeading from '../PaperContainer/SectionHeading'
import VocabTable, { VocabTableProps } from './VocabTable'

export default function IgnoredWords({
  actions,
  furigana,
  vocab,
}: {
  actions: VocabTableProps['actions']
  furigana: boolean
  vocab: Word[]
}) {
  return (
    <Spoiler
      classNames={{
        control: classes.spoilerControl,
        root: classes.spoilerRoot,
      }}
      hideLabel={
        <>
          <SectionHeading>Ignored words</SectionHeading>
          <IconChevronUp />
        </>
      }
      initialState={false}
      maxHeight={0}
      showLabel={
        <>
          <SectionHeading>Ignored words</SectionHeading>
          <IconChevronDown />
        </>
      }
    >
      <div className={classes.spoilerContent}>
        <VocabTable
          actions={actions}
          furigana={furigana}
          type='excludedFromWork'
          vocab={vocab}
        />
      </div>
    </Spoiler>
  )
}
