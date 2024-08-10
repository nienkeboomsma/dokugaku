import { Indicator } from '@mantine/core'

import classes from './Volume.module.css'
import { type SeriesInfo } from '../../types/SeriesInfo'
import ScaleLink from '../ScaleLink'
import WorkCover from '../WorkCover'
import WorkStatusBadge from '../BrowsePage/WorkStatusBadge'

const MIN_WIDTH = '7.5rem'

export default function Volume({
  indicatorSize,
  priority,
  volume,
}: {
  indicatorSize: string
  priority?: boolean
  volume: SeriesInfo['volumes'][number]
}) {
  return (
    <ScaleLink href={`/works/${volume.id}`}>
      <div className={classes.container}>
        <Indicator label={volume.volumeNumber} offset={5} size={indicatorSize}>
          <WorkCover
            coverPath={`/assets/${volume.id}/cover.webp`}
            grow
            maxProgress={volume.maxProgress}
            priority={priority}
            progress={volume.progress}
          />
        </Indicator>
        <WorkStatusBadge
          className={classes.statusBadge}
          status={volume.status}
        />
      </div>
    </ScaleLink>
  )
}

export const VolumeMinWidth = MIN_WIDTH
