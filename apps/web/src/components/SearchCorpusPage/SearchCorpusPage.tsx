'use client'

import { useEffect, useState } from 'react'
import { useDebouncedValue } from '@mantine/hooks'

import classes from './SearchCorpusPage.module.css'
import SearchFilterSort from '../SearchFilterSort/SearchFilterSort'
import ScaleLink from '../ScaleLink'
import {
  WorkCardMinWidthDesktop,
  WorkCardMinWidthMobile,
  WorkCardMaxWidth,
} from '../BrowsePage/WorkCard'
import { queryWorkProcessor } from '../../util/queryWorkprocessor'

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

  useEffect(() => {
    if (!debouncedSearchValue) return

    const effect = async () => {
      const data = await queryWorkProcessor('searchCorpus', {
        query: debouncedSearchValue,
      })

      if (!data) throw Error

      const { hits } = data

      if (hits.length < 1) {
        setNoHits(true)
      }

      setNoHits(false)
      setHits(data.hits)
    }

    effect()
  }, [debouncedSearchValue])

  const maxNumberOfColumns = 4

  const numberOfColumns =
    hits.length < maxNumberOfColumns ? hits.length : maxNumberOfColumns

  const cssVariables = {
    '--column-min-width-desktop': WorkCardMinWidthDesktop,
    '--column-min-width-mobile': WorkCardMinWidthMobile,
    '--grid-width': `calc(${numberOfColumns} * ${WorkCardMaxWidth} + (${numberOfColumns - 1} * var(--mantine-spacing-lg))`,
  } as React.CSSProperties

  return (
    <div className={classes.container} style={cssVariables}>
      <SearchFilterSort
        maxWidth="26rem"
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <div className={classes.worksContainer}>
        {hits.map((hit) => {
          return (
            <ScaleLink href={hit.url} key={hit.id}>
              {/* <WorkCard workCardInfo={hit} /> */}
              {`(${hit.hitCount})   ${hit.title}`}
            </ScaleLink>
          )
        })}
      </div>
    </div>
  )
}
