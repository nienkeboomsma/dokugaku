import { Dispatch, SetStateAction } from 'react'
import { IconArrowsSort, IconFilter } from '@tabler/icons-react'

import classes from './SearchFilterSort.module.css'
import Search from './Search'
import PopoverButton from './PopoverButton'

export default function SearchFilterSort({
  filterContent,
  maxWidth,
  searchValue,
  setSearchValue,
  sortContent,
}: {
  filterContent?: React.ReactNode
  maxWidth?: string
  searchValue: string
  setSearchValue: Dispatch<SetStateAction<string>>
  sortContent?: React.ReactNode
}) {
  return (
    <div
      className={classes.controls}
      style={{ '--max-width': maxWidth ?? '100%' } as React.CSSProperties}
    >
      <Search searchValue={searchValue} setSearchValue={setSearchValue} />

      {filterContent && (
        <PopoverButton
          buttonIcon={IconFilter}
          buttonLabel='Filter'
          buttonSize='input-xs'
          buttonVariant='filled'
          iconSize='60%'
          position='bottom'
          strokeSize={1.5}
        >
          {filterContent}
        </PopoverButton>
      )}

      {sortContent && (
        <PopoverButton
          buttonIcon={IconArrowsSort}
          buttonLabel='Sort'
          buttonSize='input-xs'
          buttonVariant='filled'
          iconSize='60%'
          position='bottom'
          strokeSize={1.5}
        >
          {sortContent}
        </PopoverButton>
      )}
    </div>
  )
}
