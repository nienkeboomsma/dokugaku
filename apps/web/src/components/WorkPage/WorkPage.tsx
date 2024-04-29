'use client'

import { useState } from 'react'
import { Button } from '@mantine/core'
import { IconBook2 } from '@tabler/icons-react'
import { GQL_ReadStatus } from '@repo/graphql-types'

import classes from './WorkPage.module.css'
import { type WorkInfo } from '../../types/WorkInfo'
import { type Word } from '../../types/Word'
import { useVocab } from '../../hooks/useVocab'
import PaperContainer from '../PaperContainer/PaperContainer'
import WorkCover from '../WorkCover'
import ReadStatusSelector from '../ReadStatusSelector'
import Link from 'next/link'
import WorkTitle from '../WorkTitle'
import AuthorList from '../AuthorList'
import SectionHeading from '../PaperContainer/SectionHeading'
import VocabTable, { VocabTableMaxWidth } from '../VocabTable/VocabTable'
import IgnoredWords from '../VocabTable/IgnoredWords'

const coverWidth = '10rem'

const cssVariables = {
  '--cover-width': coverWidth,
  '--second-column-max-width': VocabTableMaxWidth,
  '--second-column-width': 'calc(100% - var(--cover-width) - var(--gap))',
} as React.CSSProperties

// TODO: Hook up to GraphQL
const callToApi = (id: string, status: GQL_ReadStatus) => {
  console.log(id, status)
}

export default function WorkPage({
  initialVocab,
  work,
}: {
  initialVocab: Word[]
  work?: WorkInfo
}) {
  // TODO: design a proper placeholder page
  if (!work) return 'Oops'

  const [readStatus, setReadStatus] = useState(work.status)
  const { actions, vocab } = useVocab(initialVocab, {
    isSeries: true,
    seriesOrWorkId: work.id,
  })

  return (
    <PaperContainer maxWidth={`calc(${coverWidth} + ${VocabTableMaxWidth})`}>
      <div className={classes.container} style={cssVariables}>
        <div className={classes.firstColumn}>
          <WorkCover
            coverPath={`/works/${work.id}/cover.webp`}
            maxProgress={work.maxProgress}
            progress={work.progress}
            width={coverWidth}
          />
          <ReadStatusSelector
            updateStatus={(status: GQL_ReadStatus) => {
              callToApi(work.id, status)
              setReadStatus(status)
            }}
            status={readStatus}
          />
          <Button
            component={Link}
            href='/'
            leftSection={<IconBook2 size={14} />}
            variant='light'
          >
            Go to reader
          </Button>
        </div>

        <div className={classes.secondColumn}>
          <div className={classes.titleAndAuthors}>
            <WorkTitle order={1} size='h3'>
              {work.title}
            </WorkTitle>
            <AuthorList authors={work.authors} />
          </div>
          <div className={classes.frequencyListContainer}>
            <SectionHeading>Frequency list</SectionHeading>
            <VocabTable
              actions={actions}
              furigana
              type='frequencyList'
              vocab={vocab}
            />
          </div>
          <IgnoredWords actions={actions} furigana vocab={vocab} />
        </div>
      </div>
    </PaperContainer>
  )
}
