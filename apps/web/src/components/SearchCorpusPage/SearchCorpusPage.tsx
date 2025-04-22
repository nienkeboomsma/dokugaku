'use client'

import { useEffect, useState } from 'react'
import { Indicator } from '@mantine/core'
import { useDebouncedValue, useLocalStorage } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'

import classes from './SearchCorpusPage.module.css'
import { queryWorkProcessor } from '../../util/queryWorkprocessor'
import SearchFilterSort from '../SearchFilterSort/SearchFilterSort'
import ResultsSort, { SortOrder } from './ResultsSort'
import ResultsFilter from './ResultsFilter'
import ScaleLink from '../ScaleLink'
import WorkCover from '../WorkCover'

type CorpusSearchResult = {
  id: string
  title: string
  allHits: {
    hitCount: number
    url: string
  }
  readHits: {
    hitCount: number
    url: string
  }
}

const sortHits = (
  hits: CorpusSearchResult[],
  includeUnread: boolean,
  sortOrder: SortOrder
): CorpusSearchResult[] => {
  let visibleHits = [...hits]

  if (!includeUnread) {
    visibleHits = visibleHits.filter((hit) => hit.readHits.hitCount > 0)
  }

  if (sortOrder === SortOrder.HitCount) {
    visibleHits.sort((a, b) =>
      includeUnread
        ? b.allHits.hitCount - a.allHits.hitCount
        : b.readHits.hitCount - a.readHits.hitCount
    )
  }

  return visibleHits
}

export default function SearchCorpusPage() {
  const [noHits, setNoHits] = useState(false)
  const [hits, setHits] = useState<CorpusSearchResult[]>([])
  const [visibleHits, setVisibleHits] = useState<CorpusSearchResult[]>([])
  const [searchValue, setSearchValue] = useState('')
  const [debouncedSearchValue] = useDebouncedValue(searchValue, 500)
  const [includeUnread, setIncludeUnread] = useLocalStorage({
    defaultValue: false,
    key: 'DOKUGAKU_CORPUS_SEARCH_INCLUDE_UNREAD',
  })
  const [sortOrder, setSortOrder] = useLocalStorage({
    defaultValue: SortOrder.HitCount,
    key: 'DOKUGAKU_CORPUS_SEARCH_SORT_ORDER',
  })

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
        setVisibleHits(sortHits(hits, includeUnread, sortOrder))
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

  useEffect(() => {
    setVisibleHits(sortHits(hits, includeUnread, sortOrder))
  }, [includeUnread, sortOrder])

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
        filterContent={
          <ResultsFilter
            includeUnread={includeUnread}
            setIncludeUnread={setIncludeUnread}
          />
        }
        maxWidth="26rem"
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        sortContent={
          <ResultsSort sortOrder={sortOrder} setSortOrder={setSortOrder} />
        }
      />
      {noHits ? (
        'No results'
      ) : !includeUnread && visibleHits.length === 0 && hits.length > 0 ? (
        `No results in read sentences. ${hits.length} ${hits.length === 1 ? 'result' : 'results'} in unread sentences.`
      ) : (
        <div className={classes.worksContainer}>
          {visibleHits.map((hit) => {
            return (
              <ScaleLink
                href={includeUnread ? hit.allHits.url : hit.readHits.url}
                key={hit.id}
              >
                <Indicator
                  label={
                    includeUnread ? hit.allHits.hitCount : hit.readHits.hitCount
                  }
                  offset={5}
                  size={'1.4rem'}
                >
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
