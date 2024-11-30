'use client'

import { useEffect, useState } from 'react'
import { useDebouncedValue, useLocalStorage } from '@mantine/hooks'
import { GQL_ReadStatus } from '@repo/graphql-types'

import classes from './BrowsePage.module.css'
import type { Option, Options } from '../SearchFilterSort/CheckboxGroup'
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

export interface StatusOptions extends Options {
  [GQL_ReadStatus.Abandoned]: Option
  [GQL_ReadStatus.New]: Option
  [GQL_ReadStatus.Read]: Option
  [GQL_ReadStatus.Reading]: Option
  [GQL_ReadStatus.WantToRead]: Option
}

export default function BrowsePage({
  initialWorkCards,
}: {
  initialWorkCards: WorkCardInfo[]
}) {
  const [workCards, setWorkCards] = useState<WorkCardInfo[]>([])
  const [searchValue, setSearchValue] = useState('')
  const [debouncedSearchValue] = useDebouncedValue(searchValue, 500)

  const [showStatusOptions, setShowStatusOptions] =
    useLocalStorage<StatusOptions>({
      defaultValue: {
        [GQL_ReadStatus.Abandoned]: { checked: true, label: 'Abandoned' },
        [GQL_ReadStatus.New]: { checked: true, label: 'New' },
        [GQL_ReadStatus.Read]: { checked: true, label: 'Read' },
        [GQL_ReadStatus.Reading]: { checked: true, label: 'Reading' },
        [GQL_ReadStatus.WantToRead]: { checked: true, label: 'Want to read' },
      },
      key: 'DOKUGAKU_SHOW_STATUS',
    })
  console.log('showStatusOptions where its defined:', showStatusOptions)

  useEffect(() => {
    setWorkCards(
      initialWorkCards.filter((card) =>
        filterCards(card, debouncedSearchValue, showStatusOptions)
      )
    )
  }, [debouncedSearchValue, showStatusOptions])

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
            showStatusOptions={showStatusOptions}
            setShowStatusOptions={setShowStatusOptions}
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
