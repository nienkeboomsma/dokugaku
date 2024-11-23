import classes from './Browse.module.css'
import { maxNumberOfColumns } from './Browse'
import {
  WorkCardMaxWidth,
  WorkCardMinWidthDesktop,
  WorkCardMinWidthMobile,
} from './WorkCard'
import SearchFilterSort from '../SearchFilterSort/SearchFilterSort'
import WorkCardFilter from './WorkCardFilter'
import WorkCardSkeleton from './WorkCardSkeleton'

export default function BrowseSkeleton() {
  const numberOfColumns = maxNumberOfColumns

  const cssVariables = {
    '--column-min-width-desktop': WorkCardMinWidthDesktop,
    '--column-min-width-mobile': WorkCardMinWidthMobile,
    '--grid-width': `calc(${numberOfColumns} * ${WorkCardMaxWidth} + (${numberOfColumns - 1} * var(--mantine-spacing-lg))`,
  } as React.CSSProperties

  return (
    <div className={classes.container} style={cssVariables}>
      <SearchFilterSort
        filterContent={
          <WorkCardFilter
            showFinished={false}
            setShowFinished={() => {}}
            showAbandoned={false}
            setShowAbandoned={() => {}}
          />
        }
        maxWidth='26rem'
        searchValue=''
        setSearchValue={() => {}}
      />

      <div className={classes.worksContainer}>
        {Array(50)
          .fill(undefined)
          .map(() => (
            <WorkCardSkeleton />
          ))}
      </div>
    </div>
  )
}
