'use client'

import { useEffect, useState } from 'react'
import { useDebouncedValue, useLocalStorage } from '@mantine/hooks'

import classes from './Browse.module.css'
import type { WorkCardInfo } from '../../types/WorkCardInfo'
import filterCards from './filterCards'
import SearchFilterSort from '../SearchFilterSort/SearchFilterSort'
import WorkCardFilter from './WorkCardFilter'
import ScaleLink from '../ScaleLink'
import WorkCard, {
  WorkCardMinWidthDesktop,
  WorkCardMinWidthMobile,
  WorkCardMaxWidth,
} from './WorkCard'
import SkeletonWorkCard from './SkeletonWorkCard'

export default function Browse({
  data,
  error,
  loading,
}: {
  data?: WorkCardInfo[]
  error?: Error
  loading: boolean
}) {
  if (error) 'Oops'

  const [workCards, setWorkCards] = useState<WorkCardInfo[]>()
  const [searchValue, setSearchValue] = useState('')
  const [debouncedSearchValue] = useDebouncedValue(searchValue, 500)

  const [showFinished, setShowFinished] = useLocalStorage({
    defaultValue: true,
    key: 'DOKUGAKU_SHOW_FINISHED',
  })
  const [showAbandoned, setShowAbandoned] = useLocalStorage({
    defaultValue: true,
    key: 'DOKUGAKU_SHOW_ABANDONED',
  })

  const maxNumberOfColumns = 4

  const getNumberOfColumns = () => {
    if (!data || !workCards || loading) return maxNumberOfColumns

    return workCards.length < maxNumberOfColumns
      ? workCards.length
      : maxNumberOfColumns
  }

  const cssVariables = {
    '--column-min-width-desktop': WorkCardMinWidthDesktop,
    '--column-min-width-mobile': WorkCardMinWidthMobile,
    '--grid-width': `calc(${getNumberOfColumns()} * ${WorkCardMaxWidth} + (${getNumberOfColumns() - 1} * var(--mantine-spacing-lg))`,
  } as React.CSSProperties

  useEffect(() => {
    if (!data) return

    setWorkCards(
      data.filter((card) =>
        filterCards(card, debouncedSearchValue, showFinished, showAbandoned)
      )
    )
  }, [data, debouncedSearchValue, showFinished, showAbandoned])

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
        {!workCards || loading
          ? Array(50)
              .fill(undefined)
              .map(() => <SkeletonWorkCard />)
          : workCards.map((card) => (
              <ScaleLink
                href={`/${card.isSeries ? 'series' : 'works'}/${card.id}`}
                key={card.id}
              >
                <WorkCard workCardInfo={card} />
              </ScaleLink>
            ))}
      </div>
    </div>
  )
}
