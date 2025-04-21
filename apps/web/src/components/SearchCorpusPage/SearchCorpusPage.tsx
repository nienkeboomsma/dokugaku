'use client'

import { useEffect, useState } from 'react'
import { Indicator } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'

import classes from './SearchCorpusPage.module.css'
import { queryWorkProcessor } from '../../util/queryWorkprocessor'
import SearchFilterSort from '../SearchFilterSort/SearchFilterSort'
import ScaleLink from '../ScaleLink'
import WorkCover from '../WorkCover'

type CorpusSearchResult = {
  hitCount: number
  id: string
  title: string
  url: string
}

export default function SearchCorpusPage() {
  const [hits, setHits] = useState<CorpusSearchResult[]>([])
  const [noHits, setNoHits] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [debouncedSearchValue] = useDebouncedValue(searchValue, 500)

  console.table({ hits, noHits })

  useEffect(() => {
    const effect = async () => {
      try {
        if (debouncedSearchValue === '') {
          setNoHits(false)
          setHits([])
          return
        }

        const data = await queryWorkProcessor('searchCorpus', {
          query: debouncedSearchValue,
        })

        if (!data) throw Error

        const { hits } = data

        setNoHits(hits.length <= 0)
        setHits(hits)
      } catch {
        notifications.show({
          title: 'Unable to search corpus',
          message: '(Re)start all containers and try again',
          color: 'red',
        })
      }
    }

    effect()
  }, [debouncedSearchValue])

  const maxNumberOfColumns = 4

  const numberOfColumns =
    hits.length < maxNumberOfColumns ? hits.length : maxNumberOfColumns

  const cssVariables = {
    '--column-width': '7.5rem',
    '--grid-width': `calc(${numberOfColumns} * var('--column-width') + (${numberOfColumns - 1} * var(--mantine-spacing-lg))`,
  } as React.CSSProperties

  return (
    <div className={classes.container} style={cssVariables}>
      <SearchFilterSort
        maxWidth="26rem"
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      {noHits ? (
        'No results'
      ) : (
        <div className={classes.worksContainer}>
          {hits.map((hit) => {
            return (
              <ScaleLink href={hit.url} key={hit.id}>
                <Indicator label={hit.hitCount} offset={5} size={'1.4rem'}>
                  <WorkCover coverPath={`/assets/${hit.id}/cover.webp`} grow />
                </Indicator>
              </ScaleLink>
            )
          })}
        </div>
      )}
    </div>
  )
}
