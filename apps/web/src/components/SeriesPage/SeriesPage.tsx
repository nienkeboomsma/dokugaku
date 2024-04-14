'use client'

import classes from './SeriesPage.module.css'
import { SeriesInfo } from '../../types/SeriesInfo'
import PaperContainer from '../PaperContainer/PaperContainer'
import WorkTitle from '../WorkTitle'
import AuthorList from '../AuthorList'
import StatusSelector from '../ReadStatusSelector'
import SectionHeading from '../PaperContainer/SectionHeading'
import VocabTable, { VocabTableMaxWidth } from '../VocabTable/VocabTable'
import IgnoredWords from '../VocabTable/IgnoredWords'
import { useState } from 'react'
import { ReadStatus } from '../../types/Work'
import { useVocab } from '../../hooks/useVocab'
import Volumes from './Volumes'

// TODO: Hook up to GraphQL
const callToApi = (id: string, status: ReadStatus) => {
  console.log(id, status)
}

export default function SeriesPage({ series }: { series: SeriesInfo }) {
  const [seriesStatus, setSeriesStatus] = useState(series.status)
  const { actions, vocab } = useVocab(series.vocab, {
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
            <StatusSelector
              setValue={(status: ReadStatus) => {
                callToApi(series.id, status)
                setSeriesStatus(status)
              }}
              value={seriesStatus}
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
