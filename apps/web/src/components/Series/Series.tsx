'use client'

import { useState } from 'react'
import type {
  GQL_ReadStatus,
  GQL_UpdateSeriesReadStatusMutation,
} from '@repo/graphql-types'
import { useMutation } from '@apollo/client'
import { notifications } from '@mantine/notifications'
import { ActionIcon } from '@mantine/core'
import { IconPencil, IconTrash } from '@tabler/icons-react'

import classes from './Series.module.css'
import type { SeriesInfo } from '../../types/SeriesInfo'
import { useDeleteWorkOrSeries } from '../../hooks/useDeleteWorkOrSeries'
import { UPDATE_SERIES_READ_STATUS } from '../../graphql/queries/updateReadStatus'
import { updateCacheOnSeriesStateChange } from '../../graphql/cache/updateSeriesCache'
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

export default function Series({ series }: { series: SeriesInfo }) {
  const [seriesStatus, setSeriesStatus] = useState(series.status)
  const [seriesStatusLoading, setSeriesStatusLoading] = useState(false)

  const { ConfirmDeleteModal, open } = useDeleteWorkOrSeries(series)
  const [updateSeriesStatus] = useMutation<GQL_UpdateSeriesReadStatusMutation>(
    UPDATE_SERIES_READ_STATUS
  )

  const seriesStatusHandler = async (status: GQL_ReadStatus) => {
    setSeriesStatusLoading(true)

    try {
      const { data } = await updateSeriesStatus({
        variables: { input: { seriesId: series.id, status } },
        update: (cache, { data }) =>
          updateCacheOnSeriesStateChange(cache, data, series.id, status),
      })

      if (!data) throw Error('Something went wrong')

      const { status: newStatus, success } = data.updateSeriesReadStatus

      if (!success || !newStatus) throw Error('Something went wrong')

      setSeriesStatus(newStatus)
    } catch {
      notifications.show({
        title: 'Something went wrong',
        message: 'Please try again later',
      })
    } finally {
      setSeriesStatusLoading(false)
    }
  }

  return (
    <>
      <ConfirmDeleteModal />
      <PaperContainer
        maxWidth={`calc(${VocabTableMaxWidth} + 2 * ${PaperContainerPadding})`}
      >
        <div className={classes.contentContainer}>
          <div className={classes.seriesInfo}>
            <div className={classes.titleAndAuthors}>
              <span className={classes.titleContainer}>
                <WorkTitle order={1} size='h3'>
                  {series.title}
                </WorkTitle>
                {/* <ActionIcon variant='subtle'>
                        <IconPencil size='70%' stroke={1.5} />
                      </ActionIcon> */}
                <ActionIcon color='red' onClick={open} variant='subtle'>
                  <IconTrash size='70%' stroke={1.5} />
                </ActionIcon>
              </span>
              <AuthorList
                authors={series.authors}
                classNames={{ author: classes.author }}
              />
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
    </>
  )
}
