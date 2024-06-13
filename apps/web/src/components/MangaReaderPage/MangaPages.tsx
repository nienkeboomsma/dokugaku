import classes from './MangaPages.module.css'
import type { Page } from '../../types/MangaPage'
import MangaPage from './MangaPage'

export default function MangaPages({
  pages,
  showTwoPages,
}: {
  pages: Array<Page | undefined>
  showTwoPages: boolean
}) {
  return (
    <div className={classes.container}>
      {showTwoPages && <MangaPage key={pages[1]?.pageNumber} page={pages[1]} />}
      <MangaPage key={pages[0]?.pageNumber} page={pages[0]} />
    </div>
  )
}
