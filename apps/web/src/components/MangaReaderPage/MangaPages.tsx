import classes from './MangaPages.module.css'
import type { Page } from '../../types/MangaPage'
import MangaPage from './MangaPage'

export default function MangaPages({
  currentPageNumber,
  pages,
  showTwoPages,
}: {
  currentPageNumber: number
  pages: Page[]
  showTwoPages: boolean
}) {
  return (
    <div className={classes.container}>
      {showTwoPages && (
        <MangaPage
          key={pages[currentPageNumber]?.pageNumber}
          page={pages[currentPageNumber]}
        />
      )}
      <MangaPage
        key={pages[currentPageNumber - 1]?.pageNumber}
        page={pages[currentPageNumber - 1]}
      />
    </div>
  )
}
