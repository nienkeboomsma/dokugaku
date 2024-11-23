import { Anchor } from '@mantine/core'
import Link from 'next/link'

import classes from './PreviousNextVolumes.module.css'

type Volume = {
  id: string
  volumeNumber: number
}

const getPreviousVolume = (currentVolumeNumber: number, volumes: Volume[]) => {
  const currentVolumeIndex = volumes.findIndex(
    (volume) => volume.volumeNumber === currentVolumeNumber
  )

  if (currentVolumeIndex === -1) return undefined

  const previousIndex = currentVolumeIndex - 1
  return previousIndex > -1 ? volumes[previousIndex] : undefined
}

const getNextVolume = (currentVolumeNumber: number, volumes: Volume[]) => {
  const currentVolumeIndex = volumes.findIndex(
    (volume) => volume.volumeNumber === currentVolumeNumber
  )

  if (currentVolumeIndex === -1) return undefined

  const nextIndex = currentVolumeIndex + 1
  return nextIndex > volumes.length - 1 ? undefined : volumes[nextIndex]
}

export default function PreviousNextVolumes({
  currentVolumeNumber,
  volumes,
}: {
  currentVolumeNumber: number
  volumes: Volume[]
}) {
  const previousVolume = getPreviousVolume(currentVolumeNumber, volumes)
  const nextVolume = getNextVolume(currentVolumeNumber, volumes)

  if (!previousVolume && !nextVolume) return <></>

  return (
    <div className={classes.container}>
      {previousVolume && (
        <Link className={classes.previous} href={`/works/${previousVolume.id}`}>
          <Anchor component='span'>
            {`« Volume ${previousVolume.volumeNumber}`}
          </Anchor>
        </Link>
      )}
      {nextVolume && (
        <Link className={classes.next} href={`/works/${nextVolume.id}`}>
          <Anchor component='span'>
            {`Volume ${nextVolume.volumeNumber} »`}
          </Anchor>
        </Link>
      )}
    </div>
  )
}
