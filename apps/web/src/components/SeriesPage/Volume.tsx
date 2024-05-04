import { Indicator } from '@mantine/core'

import { SeriesInfo } from '../../types/SeriesInfo'
import ScaleLink from '../ScaleLink'
import WorkCover from '../WorkCover'

const MIN_WIDTH = '6rem'

export default function Volume({
  indicatorSize,
  volume,
}: {
  indicatorSize: string
  volume: SeriesInfo['volumes'][number]
}) {
  return (
    <ScaleLink href={`/works/${volume.id}`}>
      <Indicator label={volume.volumeNumber} offset={5} size={indicatorSize}>
        <WorkCover
          coverPath={`/works/${volume.id}/cover.webp`}
          grow
          // maxProgress={volume.maxProgress}
          // progress={volume.progress}
        />
      </Indicator>
    </ScaleLink>
  )
}

export const VolumeMinWidth = MIN_WIDTH
