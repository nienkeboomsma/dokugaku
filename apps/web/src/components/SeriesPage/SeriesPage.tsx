'use client'

import { useState } from 'react'
import { GQL_ReadStatus } from '@repo/graphql-types'
import { useMutation } from '@apollo/client'

import classes from './SeriesPage.module.css'
import { type SeriesInfo } from '../../types/SeriesInfo'
import { UPDATE_SERIES_READ_STATUS } from '../../graphql/queries/updateReadStatus'
import PaperContainer, {
  PaperContainerPadding,
} from '../PaperContainer/PaperContainer'
import WorkTitle from '../WorkTitle'
import AuthorList from '../AuthorList'
import ReadStatusSelector from '../ReadStatusSelector'
import Volumes from './Volumes'
import SectionHeading from '../PaperContainer/SectionHeading'
import VocabTable, {
  VocabTableMaxWidth,
  VocabTableType,
} from '../VocabTable/VocabTable'

export default function SeriesPage({ series }: { series?: SeriesInfo }) {
  // TODO: design a proper placeholder page
  if (!series) return 'Oops'

  const [seriesStatus, setSeriesStatus] = useState(series.status)
  const [seriesStatusLoading, setSeriesStatusLoading] = useState(false)
  // TODO: evict stale data from cache
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
          <SectionHeading>Vocab</SectionHeading>
          <VocabTable
            furigana
            seriesOrWork={series}
            type={VocabTableType.SeriesOrWork}
          />
        </div>
      </div>
    </PaperContainer>
  )
}
