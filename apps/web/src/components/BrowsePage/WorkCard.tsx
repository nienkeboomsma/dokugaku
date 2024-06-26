import {
  Center,
  MantineTheme,
  Paper,
  rem,
  RingProgress,
  Text,
  ThemeIcon,
  useMantineTheme,
} from '@mantine/core'
import { IconCheck } from '@tabler/icons-react'
import Image from 'next/image'

import classes from './WorkCard.module.css'
import { isSeries, type WorkCardInfo } from '../../types/WorkCardInfo'
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

const getCoverSrc = (workCardInfo: WorkCardInfo) => {
  if (isSeries(workCardInfo) && workCardInfo.firstVolumeId) {
    return `/assets/${workCardInfo.firstVolumeId}/cover.webp`
  }

  if (isSeries(workCardInfo) && !workCardInfo.firstVolumeId) {
    // TODO: add dummyCover file
    return `/assets/dummyCover.webp`
  }

  return `/assets/${workCardInfo.id}/cover.webp`
}

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
        <ThemeIcon aria-label='100%' radius='lg' size='sm' variant='light'>
          <IconCheck size={22} />
        </ThemeIcon>
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
  workCardInfo?: WorkCardInfo
}) {
  const theme = useMantineTheme()

  // TODO: make a proper dummy workCard
  if (!workCardInfo) return 'Oops'

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
            src={getCoverSrc(workCardInfo)}
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
            {isSeries(workCardInfo) && workCardInfo.numberOfVolumes > 0 && (
              <Text
                c='dimmed'
                className={classes.numberOfVolumes}
                size={rem(13)}
              >{`${workCardInfo.numberOfVolumes} ${workCardInfo.numberOfVolumes > 1 ? 'volumes' : 'volume'}`}</Text>
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
