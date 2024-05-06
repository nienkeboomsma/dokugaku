'use client'

import { useEffect, useState } from 'react'
import { useDebouncedValue } from '@mantine/hooks'

import classes from './BrowsePage.module.css'
import { type WorkCardInfo } from '../../types/WorkCardInfo'
import filterCards from './filterCards'
import SearchFilterSort from '../SearchFilterSort/SearchFilterSort'
import WorkCardFilter from './WorkCardFilter'
import ScaleLink from '../ScaleLink'
import WorkCard, {
  WorkCardMinWidthDesktop,
  WorkCardMinWidthMobile,
  WorkCardMaxWidth,
} from './WorkCard'

export default function BrowsePage({
  initialWorkCards,
}: {
  initialWorkCards: WorkCardInfo[]
}) {
  const [workCards, setWorkCards] = useState(initialWorkCards)
  const [searchValue, setSearchValue] = useState('')
  const [debouncedSearchValue] = useDebouncedValue(searchValue, 500)
  // TODO: save these preferences somewhere
  const [showFinished, setShowFinished] = useState(true)
  const [showAbandoned, setShowAbandoned] = useState(true)

  useEffect(() => {
    setWorkCards(
      initialWorkCards.filter((card) =>
        filterCards(card, debouncedSearchValue, showFinished, showAbandoned)
      )
    )
  }, [debouncedSearchValue, showFinished, showAbandoned])

  const maxNumberOfColumns = 4

  const numberOfColumns =
    workCards.length < maxNumberOfColumns
      ? workCards.length
      : maxNumberOfColumns

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
            showFinished={showFinished}
            setShowFinished={setShowFinished}
            showAbandoned={showAbandoned}
            setShowAbandoned={setShowAbandoned}
          />
        }
        maxWidth='26rem'
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <div className={classes.worksContainer}>
        {workCards.map((card) => {
          return (
            <ScaleLink
              href={`/${card.isSeries ? 'series' : 'works'}/${card.id}`}
              key={card.id}
            >
              <WorkCard workCardInfo={card} />
            </ScaleLink>
          )
        })}
      </div>
    </div>
  )
}
