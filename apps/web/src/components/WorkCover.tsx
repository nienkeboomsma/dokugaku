import Image from 'next/image'

import classes from './WorkCover.module.css'
import { isNumber } from '../types/utility'
import { getPercentage } from '../util/getPercentage'

interface CSSVariables extends React.CSSProperties {
  [key: `--${string}`]: string | number
}

const getCSSVariables = (
  grow: boolean,
  maxProgress?: number,
  progress?: number,
  width?: string
) => {
  const variables = {} as CSSVariables

  if (isNumber(progress) && isNumber(maxProgress)) {
    variables['--unread-width'] =
      `calc(100% - ${getPercentage(progress, maxProgress)}%)`
  }

  if (!grow && width) {
    variables['--wrapper-width'] = width
  }

  if (grow) {
    variables['--wrapper-width'] = '100%'
  }

  return variables
}

export default function WorkCover({
  coverPath,
  grow,
  maxProgress,
  priority,
  progress,
  width,
}: {
  coverPath: string
  grow?: boolean
  maxProgress?: number
  priority?: boolean
  progress?: number
  width?: string
}) {
  return (
    <div
      className={classes.wrapper}
      style={
        getCSSVariables(
          grow || false,
          maxProgress,
          progress,
          width
        ) as React.CSSProperties
      }
    >
      <Image
        alt="Cover image"
        className={classes.img}
        fill
        priority={priority}
        src={coverPath}
        sizes={width}
      />
      <div className={classes.overlay}></div>
    </div>
  )
}
