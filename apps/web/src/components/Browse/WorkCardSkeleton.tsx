import { Paper, Skeleton } from '@mantine/core'

import classes from './WorkCard.module.css'
import {
  WorkCardMaxWidth,
  WorkCardMinWidthDesktop,
  WorkCardMinWidthMobile,
} from './WorkCard'

export default function WorkCardSkeleton() {
  const cssVariables = {
    '--max-width': WorkCardMaxWidth,
    '--min-width-desktop': WorkCardMinWidthDesktop,
    '--min-width-mobile': WorkCardMinWidthMobile,
  } as React.CSSProperties

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
          <Skeleton height='100%' radius={0} visible>
            <div className={classes.cover}></div>
          </Skeleton>
        </div>
        {/* Description */}
        <div className={classes.description}>
          <div className={classes.titleAuthorVolumes}>
            <Skeleton height={16} width={175} />
            <Skeleton height={16} width={100} />
          </div>
          <Skeleton height={20} width={75} />
        </div>
        {/* Progress */}
        <Skeleton
          circle
          className={classes.progress}
          m={8}
          height={44}
          width={44}
        />
      </div>
    </Paper>
  )
}
