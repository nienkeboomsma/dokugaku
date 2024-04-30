'use client'

import { useState } from 'react'
import { GQL_ReadStatus } from '@repo/graphql-types'
import { useMutation } from '@apollo/client'

import classes from './SeriesPage.module.css'
import { type SeriesInfo } from '../../types/SeriesInfo'
import { type Word } from '../../types/Word'
import { useVocab } from '../../hooks/useVocab'
import { UPDATE_SERIES_READ_STATUS } from '../../graphql/updateReadStatus'
import PaperContainer, {
  PaperContainerPadding,
} from '../PaperContainer/PaperContainer'
import WorkTitle from '../WorkTitle'
import AuthorList from '../AuthorList'
import ReadStatusSelector from '../ReadStatusSelector'
import Volumes from './Volumes'
import SectionHeading from '../PaperContainer/SectionHeading'
import VocabTable, { VocabTableMaxWidth } from '../VocabTable/VocabTable'
import IgnoredWords from '../VocabTable/IgnoredWords'

export default function SeriesPage({
  initialVocab,
  series,
}: {
  initialVocab: Word[]
  series?: SeriesInfo
}) {
  // TODO: design a proper placeholder page
  if (!series) return 'Oops'

  const { actions, vocab } = useVocab(initialVocab, {
    isSeries: true,
    seriesOrWorkId: series.id,
  })

  const [seriesStatus, setSeriesStatus] = useState(series.status)
  const [seriesStatusLoading, setSeriesStatusLoading] = useState(false)
  const [updateSeriesStatus] = useMutation(UPDATE_SERIES_READ_STATUS)

  const seriesStatusHandler = async (status: GQL_ReadStatus) => {
    setSeriesStatusLoading(true)

    const { data } = await updateSeriesStatus({
      variables: { input: { seriesId: series.id, status } },
    })
    const { status: newStatus, success } = data.updateSeriesReadStatus

    if (success) {
      setSeriesStatus(newStatus)
    }

    setSeriesStatusLoading(false)
  }

  return (
    <PaperContainer
      maxWidth={`calc(${VocabTableMaxWidth} + 2 * ${PaperContainerPadding})`}
    >
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
              loading={seriesStatusLoading}
              status={seriesStatus}
              updateStatus={seriesStatusHandler}
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
