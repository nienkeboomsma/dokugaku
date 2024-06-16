import type { Dispatch, SetStateAction } from 'react'
import { ActionIcon } from '@mantine/core'
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
} from '@tabler/icons-react'

import classes from './Pagination.module.css'
import PageNumber from './PageNumber'
import { getLastPageNumber, getNewPageNumber } from '../../util/getPageNumber'

export default function Pagination({
  currentPageNumber,
  maxPageNumber,
  setCurrentPageNumber,
  showTwoPages,
  twoPageLayout,
}: {
  currentPageNumber: number
  maxPageNumber: number
  setCurrentPageNumber: Dispatch<SetStateAction<number>>
  showTwoPages: boolean
  twoPageLayout: boolean
}) {
  return (
    <div className={classes.container}>
      <ActionIcon
        aria-label='Go to last page'
        onClick={() => {
          setCurrentPageNumber(getLastPageNumber(maxPageNumber, twoPageLayout))
        }}
        size='2rem'
        variant='subtle'
      >
        <IconChevronsLeft size='100%' stroke={1.5} />
      </ActionIcon>
      <ActionIcon
        aria-label='Go to next page'
        onClick={() => {
          setCurrentPageNumber(
            getNewPageNumber(
              currentPageNumber,
              maxPageNumber,
              'forward',
              twoPageLayout
            )
          )
        }}
        size='2rem'
        variant='subtle'
      >
        <IconChevronLeft size='83%' stroke={1.8} />
      </ActionIcon>
      <PageNumber
        currentPageNumber={currentPageNumber}
        maxPageNumber={maxPageNumber}
        setCurrentPageNumber={setCurrentPageNumber}
        showTwoPages={showTwoPages}
        twoPageLayout={twoPageLayout}
      />
      <ActionIcon
        aria-label='Go to previous page'
        onClick={() => {
          setCurrentPageNumber(
            getNewPageNumber(
              currentPageNumber,
              maxPageNumber,
              'backward',
              twoPageLayout
            )
          )
        }}
        size='2rem'
        variant='subtle'
      >
        <IconChevronRight size='83%' stroke={1.8} />
      </ActionIcon>
      <ActionIcon
        aria-label='Go to first page'
        onClick={() => {
          setCurrentPageNumber(1)
        }}
        size='2rem'
        variant='subtle'
      >
        <IconChevronsRight size='100%' stroke={1.5} />
      </ActionIcon>
    </div>
  )
}
