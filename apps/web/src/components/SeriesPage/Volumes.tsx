import { useEffect, useRef } from 'react'
import { ScrollArea } from '@mantine/core'

import classes from './Volumes.module.css'
import { type VolumeInfo } from '../../types/SeriesInfo'
import SectionHeading from '../PaperContainer/SectionHeading'
import Volume from './Volume'
import { GQL_ReadStatus } from '@repo/graphql-types'

const indicatorSize = '1.4rem'

export default function Volumes({ volumes }: { volumes: VolumeInfo[] }) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const earliestReadingVolume = volumes.findIndex(
    (volume) => volume.status === GQL_ReadStatus.Reading
  )

  useEffect(
    () =>
      viewportRef.current
        ?.querySelectorAll('a')
        ?.[
          earliestReadingVolume
        ]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' }),
    []
  )

  return (
    <div>
      <SectionHeading>Volumes</SectionHeading>
      <ScrollArea
        className={classes.scrollArea}
        offsetScrollbars
        scrollbarSize={8}
        viewportRef={viewportRef}
      >
        <div className={classes.volumesContainer}>
          {volumes.map((volume) => (
            <Volume
              indicatorSize={indicatorSize}
              key={volume.id}
              volume={volume}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
