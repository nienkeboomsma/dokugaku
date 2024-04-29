'use client'

import { useState } from 'react'
import { GQL_ReadStatus } from '@repo/graphql-types'

import classes from './SeriesPage.module.css'
import { type SeriesInfo } from '../../types/SeriesInfo'
import { type Word } from '../../types/Word'
import { useVocab } from '../../hooks/useVocab'
import PaperContainer from '../PaperContainer/PaperContainer'
import WorkTitle from '../WorkTitle'
import AuthorList from '../AuthorList'
import ReadStatusSelector from '../ReadStatusSelector'
import Volumes from './Volumes'
import SectionHeading from '../PaperContainer/SectionHeading'
import VocabTable, { VocabTableMaxWidth } from '../VocabTable/VocabTable'
import IgnoredWords from '../VocabTable/IgnoredWords'

// TODO: Hook up to GraphQL
const callToApi = (id: string, status: GQL_ReadStatus) => {
  console.log(id, status)
}

export default function SeriesPage({
  initialVocab,
  series,
}: {
  initialVocab: Word[]
  series?: SeriesInfo
}) {
  // TODO: design a proper placeholder page
  if (!series) return 'Oops'

  const [seriesStatus, setSeriesStatus] = useState(series.status)
  const { actions, vocab } = useVocab(initialVocab, {
    isSeries: true,
    seriesOrWorkId: series.id,
  })

  return (
    <PaperContainer maxWidth={VocabTableMaxWidth}>
      <div className={classes.contentContainer}>
        <div className={classes.seriesInfo}>
          <div className={classes.titleAndAuthors}>
            <WorkTitle order={1} size='h3'>
              {series.title}
            </WorkTitle>
            <AuthorList authors={series.authors} />
          </div>

          <div>
            <ReadStatusSelector
              updateStatus={(status: GQL_ReadStatus) => {
                callToApi(series.id, status)
                setSeriesStatus(status)
              }}
              status={seriesStatus}
            />
          </div>
        </div>

        <Volumes volumes={series.volumes} />

        <div>
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
    </PaperContainer>
  )
}
