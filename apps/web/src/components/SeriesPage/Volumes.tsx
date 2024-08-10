import { useEffect, useRef } from 'react'
import { ScrollArea } from '@mantine/core'

import classes from './Volumes.module.css'
import { type VolumeInfo } from '../../types/SeriesInfo'
import SectionHeading from '../PaperContainer/SectionHeading'
import Volume from './Volume'
import { GQL_ReadStatus } from '@repo/graphql-types'

const indicatorSize = '1.4rem'

const getVolumeIndexToScrollTo = (volumes: VolumeInfo[]) => {
  const statusPriorities = [
    GQL_ReadStatus.Reading,
    GQL_ReadStatus.WantToRead,
    GQL_ReadStatus.New,
  ]

  for (let statusPriority of statusPriorities) {
    const earliestIndex = volumes.findIndex(
      (volume) => volume.status === statusPriority
    )

    if (earliestIndex > -1) return earliestIndex
  }

  return -1
}

export default function Volumes({ volumes }: { volumes: VolumeInfo[] }) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const volumeIndexToScrollTo = getVolumeIndexToScrollTo(volumes)

  useEffect(
    () =>
      viewportRef.current
        ?.querySelectorAll('a')
        ?.[
          volumeIndexToScrollTo
        ]?.scrollIntoView({ block: 'nearest', inline: 'center' }),
    []
  )

  return (
    <div>
      <SectionHeading>Volumes</SectionHeading>
      <ScrollArea
        classNames={{
          root: classes.scrollArea,
          viewport: classes.scrollAreaViewport,
        }}
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
