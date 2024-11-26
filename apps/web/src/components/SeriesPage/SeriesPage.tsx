'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type {
  GQL_ReadStatus,
  GQL_UpdateSeriesReadStatusMutation,
} from '@repo/graphql-types'
import { useMutation } from '@apollo/client'
import { notifications } from '@mantine/notifications'
import { ActionIcon } from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'

import classes from './SeriesPage.module.css'
import type { SeriesInfo } from '../../types/SeriesInfo'
import { useDeleteWorkOrSeries } from '../../hooks/useDeleteWorkOrSeries'
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

  const { ConfirmDeleteModal, open } = useDeleteWorkOrSeries(series)
  const [updateSeriesStatus] = useMutation<GQL_UpdateSeriesReadStatusMutation>(
    UPDATE_SERIES_READ_STATUS
  )

  const router = useRouter()
  const seriesStatusHandler = async (status: GQL_ReadStatus) => {
    setSeriesStatusLoading(true)

    try {
      const { data } = await updateSeriesStatus({
        variables: { input: { seriesId: series.id, status } },
      })

      if (
        !data ||
        !data.updateSeriesReadStatus.success ||
        !data.updateSeriesReadStatus.status
      )
        throw Error

      setSeriesStatus(data.updateSeriesReadStatus.status)

      // This flushes the NextJS router cache
      router.refresh()
    } catch {
      notifications.show({
        title: 'Unable to update reading status',
        message: (
          <span>
            Are the <code>db</code> and <code>graphql</code> containers running?
          </span>
        ),
        color: 'red',
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
