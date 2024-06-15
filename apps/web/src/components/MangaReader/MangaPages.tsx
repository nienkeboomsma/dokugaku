import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'

import classes from './MangaPages.module.css'
import type { Page } from '../../types/MangaPage'
import useMangaPagesScaling from '../../hooks/useMangaPagesScaling'
import MangaPage from './MangaPage'

export default function MangaPages({
  pages,
  showTwoPages,
}: {
  pages: Array<Page | undefined>
  showTwoPages: boolean
}) {
  const {
    dblClickAction,
    resizeObserverRef,
    setDblClickAction,
    transformComponentRef,
  } = useMangaPagesScaling(pages)

  return (
    <div ref={resizeObserverRef} style={{ height: '100%', width: '100%' }}>
      <TransformWrapper
        doubleClick={
          dblClickAction === 'zoomIn'
            ? { disabled: false, step: 0.7 }
            : { disabled: true }
        }
        limitToBounds={false}
        minScale={0.2}
        onZoomStop={() => setDblClickAction('zoomOut')}
        panning={{
          excluded: ['textBox'],
          wheelPanning: true,
        }}
        pinch={{
          step: 100,
        }}
        ref={transformComponentRef}
        wheel={{
          // Speeds up pinch on trackpad.
          // https://github.com/BetterTyped/react-zoom-pan-pinch/issues/418#issuecomment-1838584640
          smoothStep: 0.02,
          wheelDisabled: true,
        }}
      >
        <TransformComponent
          contentClass={classes.transform}
          wrapperClass={classes.transform}
        >
          <div className={classes.container} id='pagesContainer'>
            {showTwoPages && (
              <MangaPage key={pages[1]?.pageNumber} page={pages[1]} />
            )}
            <MangaPage key={pages[0]?.pageNumber} page={pages[0]} />
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  )
}
