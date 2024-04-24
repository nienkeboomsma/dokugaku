import {
  ActionIcon,
  Center,
  MantineTheme,
  Paper,
  rem,
  RingProgress,
  Text,
  useMantineTheme,
} from '@mantine/core'
import { IconCheck } from '@tabler/icons-react'
import Image from 'next/image'

import classes from './WorkCard.module.css'
import { isSeries, WorkCardInfo } from '../../types/WorkCardInfo'
import WorkTitle from '../WorkTitle'
import AuthorList from '../AuthorList'
import WorkStatusBadge from './WorkStatusBadge'

const MAX_WIDTH = '26rem'
const MIN_WIDTH_DESKTOP = '20rem'
const MAX_WIDTH_MOBILE = MIN_WIDTH_DESKTOP
const MIN_WIDTH_MOBILE = '14.5rem'

const cssVariables = {
  '--max-width': MAX_WIDTH,
  '--min-width-desktop': MIN_WIDTH_DESKTOP,
  '--min-width-mobile': MIN_WIDTH_MOBILE,
} as React.CSSProperties

function ProgressLabel({
  knownVocab,
  theme,
}: {
  knownVocab: number
  theme: MantineTheme
}) {
  if (knownVocab === 100) {
    return (
      <Center>
        <ActionIcon variant='light' radius='lg' size='sm'>
          <IconCheck size={22} />
        </ActionIcon>
      </Center>
    )
  }

  return (
    <Text c={theme.primaryColor} fw={700} size='xs' ta='center'>
      {`${knownVocab}%`}
    </Text>
  )
}

export default function WorkCard({
  workCardInfo,
}: {
  workCardInfo: WorkCardInfo
}) {
  const theme = useMantineTheme()
  const coverSrc = `/works/${isSeries(workCardInfo) ? workCardInfo.firstVolumeId : workCardInfo.id}/cover.webp`

  return (
    <Paper
      className={classes.card}
      component='article'
      shadow='xs'
      style={cssVariables}
    >
      <div className={classes.cardContent}>
        {/* Cover */}
        <div className={classes.coverWrapper}>
          <Image
            alt='Cover image'
            className={classes.cover}
            fill
            sizes={MAX_WIDTH_MOBILE}
            src={coverSrc}
          />
        </div>

        {/* Description */}
        <div className={classes.description}>
          <div className={classes.titleAuthorVolumes}>
            <WorkTitle order={2} size={'h5'}>
              {workCardInfo.title}
            </WorkTitle>
            <AuthorList
              authors={workCardInfo.authors}
              classNames={{ author: classes.author }}
            />
            {isSeries(workCardInfo) && workCardInfo.volumeNumber > 0 && (
              <Text
                c='dimmed'
                size={rem(13)}
              >{`${workCardInfo.volumeNumber} ${workCardInfo.volumeNumber > 1 ? 'volumes' : 'volume'}`}</Text>
            )}
          </div>
          <WorkStatusBadge status={workCardInfo.status} />
        </div>

        {/* Progress */}
        <RingProgress
          className={classes.progress}
          roundCaps
          size={60}
          thickness={5}
          sections={[
            { value: workCardInfo.knownVocab, color: theme.primaryColor },
          ]}
          label={
            <ProgressLabel knownVocab={workCardInfo.knownVocab} theme={theme} />
          }
        />
      </div>
    </Paper>
  )
}

export const WorkCardMaxWidth = MAX_WIDTH
export const WorkCardMinWidthDesktop = MIN_WIDTH_DESKTOP
export const WorkCardMinWidthMobile = MIN_WIDTH_MOBILE
