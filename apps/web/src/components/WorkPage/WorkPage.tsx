'use client'

import { useState } from 'react'
import { Button } from '@mantine/core'
import { IconBook2 } from '@tabler/icons-react'
import { GQL_ReadStatus } from '@repo/graphql-types'
import { useMutation } from '@apollo/client'
import Link from 'next/link'

import classes from './WorkPage.module.css'
import { type WorkInfo } from '../../types/WorkInfo'
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
  // TODO: evict stale data from cache
  const [updateReadStatus] = useMutation(UPDATE_WORK_READ_STATUS)

  const readStatusHandler = async (status: GQL_ReadStatus) => {
    setReadStatusLoading(true)

    const { data } = await updateReadStatus({
      variables: { input: { status, workId: work.id } },
    })
    const { status: newStatus, success } = data.updateWorkReadStatus

    if (success) {
      setReadStatus(newStatus)
    }

    setReadStatusLoading(false)
  }

  return (
    <PaperContainer
      maxWidth={`calc(${COVER_WIDTH} + ${VocabTableMaxWidth} + 3 * ${PaperContainerPadding})`}
    >
      <div className={classes.container} style={cssVariables}>
        <div className={classes.firstColumn}>
          <WorkCover
            coverPath={`/works/${work.id}/cover.webp`}
            // maxProgress={work.maxProgress}
            // progress={work.progress}
            width={COVER_WIDTH}
          />
          <ReadStatusSelector
            loading={readStatusLoading}
            status={readStatus}
            updateStatus={readStatusHandler}
          />
          {/* TODO: add reader functionality */}
          {/* <Button
            component={Link}
            href='/'
            leftSection={<IconBook2 size={14} />}
            variant='light'
          >
            Go to reader
          </Button> */}
        </div>

        <div className={classes.secondColumn}>
          <div className={classes.titleAndAuthors}>
            {work.volumeNumber && work.volumes && (
              <PreviousNextVolumes
                currentVolumeNumber={work.volumeNumber}
                volumes={work.volumes}
              />
            )}
            <WorkTitle order={1} size='h3'>
              {work.title}
            </WorkTitle>
            {work.seriesId && work.seriesTitle && (
              <LinkToSeries
                seriesId={work.seriesId}
                seriesTitle={work.seriesTitle}
              />
            )}
            <AuthorList authors={work.authors} />
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
  )
}
