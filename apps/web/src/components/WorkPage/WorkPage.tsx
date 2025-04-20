'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  GQL_ReadStatus,
  type GQL_UpdateWorkReadStatusMutation,
} from '@repo/graphql-types'
import { useMutation } from '@apollo/client'
import { notifications } from '@mantine/notifications'
import { ActionIcon, Button } from '@mantine/core'
import { IconBook2, IconTrash } from '@tabler/icons-react'
import Link from 'next/link'

import classes from './WorkPage.module.css'
import type { WorkInfo } from '../../types/WorkInfo'
import { useDeleteWorkOrSeries } from '../../hooks/useDeleteWorkOrSeries'
import { UPDATE_WORK_READ_STATUS } from '../../graphql/queries/updateReadStatus'
import PaperContainer, {
  PaperContainerPadding,
} from '../PaperContainer/PaperContainer'
import WorkCover from '../WorkCover'
import ReadStatusSelector from '../ReadStatusSelector'
import PreviousNextVolumes from './PreviousNextVolumes'
import WorkTitle from '../WorkTitle'
import LinkToSeries from './LinkToSeries'
import AuthorList from '../AuthorList'
import SectionHeading from '../PaperContainer/SectionHeading'
import VocabTable, {
  VocabTableMaxWidth,
  VocabTableType,
} from '../VocabTable/VocabTable'

const COVER_WIDTH = '10rem'

const cssVariables = {
  '--cover-width': COVER_WIDTH,
  '--second-column-max-width': VocabTableMaxWidth,
  '--second-column-width': 'calc(100% - var(--cover-width) - var(--gap))',
} as React.CSSProperties

export default function WorkPage({ work }: { work?: WorkInfo }) {
  // TODO: design a proper placeholder page
  if (!work) return 'Oops'

  const [readStatus, setReadStatus] = useState(work.status)
  const [readStatusLoading, setReadStatusLoading] = useState(false)

  const { ConfirmDeleteModal, open } = useDeleteWorkOrSeries(work)
  const [updateReadStatus] = useMutation<GQL_UpdateWorkReadStatusMutation>(
    UPDATE_WORK_READ_STATUS
  )

  const router = useRouter()
  const readStatusHandler = async (status: GQL_ReadStatus) => {
    setReadStatusLoading(true)

    try {
      const { data } = await updateReadStatus({
        variables: { input: { status, workId: work.id } },
      })

      if (
        !data ||
        !data.updateWorkReadStatus.success ||
        !data.updateWorkReadStatus.status
      )
        throw Error

      setReadStatus(data.updateWorkReadStatus.status)

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
      setReadStatusLoading(false)
    }
  }

  return (
    <>
      <ConfirmDeleteModal />
      <PaperContainer
        maxWidth={`calc(${COVER_WIDTH} + ${VocabTableMaxWidth} + 3 * ${PaperContainerPadding})`}
      >
        <div className={classes.container} style={cssVariables}>
          <div className={classes.firstColumn}>
            <WorkCover
              coverPath={`/assets/${work.id}/cover.webp`}
              maxProgress={work.maxProgress}
              priority
              progress={
                work.status === GQL_ReadStatus.Read
                  ? work.maxProgress
                  : work.progress
              }
              width={COVER_WIDTH}
            />
            <ReadStatusSelector
              loading={readStatusLoading}
              status={readStatus}
              updateStatus={readStatusHandler}
            />

            <Button
              component={Link}
              href={`/reader/${work.type}/${work.id}`}
              leftSection={<IconBook2 size={14} />}
              variant='light'
            >
              Go to reader
            </Button>
          </div>

          <div className={classes.secondColumn}>
            <div className={classes.titleAndAuthors}>
              {work.volumeNumber && work.volumes && (
                <PreviousNextVolumes
                  currentVolumeNumber={work.volumeNumber}
                  volumes={work.volumes}
                />
              )}
              <span className={classes.titleContainer}>
                <WorkTitle order={1} size='h3'>
                  {work.title}
                </WorkTitle>
                {/* <ActionIcon variant='subtle'>
                <IconPencil size='70%' stroke={1.5} />
              </ActionIcon> */}
                <ActionIcon color='red' onClick={open} variant='subtle'>
                  <IconTrash size='70%' stroke={1.5} />
                </ActionIcon>
              </span>
              {work.seriesId && work.seriesTitle && (
                <LinkToSeries
                  seriesId={work.seriesId}
                  seriesTitle={work.seriesTitle}
                />
              )}
              <AuthorList
                authors={work.authors}
                classNames={{ author: classes.author }}
              />
            </div>
            <div>
              <SectionHeading>Vocab</SectionHeading>
              <VocabTable
                furigana
                seriesOrWork={work}
                type={VocabTableType.SeriesOrWork}
              />
            </div>
          </div>
        </div>
      </PaperContainer>
    </>
  )
}
