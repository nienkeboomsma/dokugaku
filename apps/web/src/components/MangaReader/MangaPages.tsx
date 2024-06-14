import { useEffect, useRef, useState } from 'react'
import {
  ReactZoomPanPinchRef,
  TransformComponent,
  TransformWrapper,
} from 'react-zoom-pan-pinch'
import { useElementSize } from '@mantine/hooks'

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
  const [dblClickAction, setDblClickAction] = useState<'zoomIn' | 'zoomOut'>()
  const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null)
  const { height, ref: resizeObserverRef, width } = useElementSize()

  const scaleToFit = (animationTime?: number) => {
    // Setting animationTime to 0 is buggy.
    // https://github.com/BetterTyped/react-zoom-pan-pinch/issues/453#issuecomment-1953193664
    const duration = animationTime ?? 1
    if (!transformComponentRef.current) return
    const { zoomToElement } = transformComponentRef.current

    zoomToElement('pagesContainer', undefined, duration)
    setDblClickAction('zoomIn')
  }

  useEffect(() => {
    scaleToFit()
  }, [pages, height, width])

  const handleDoubleClick = (event: MouseEvent) => {
    if (dblClickAction === 'zoomIn') {
      event.preventDefault()
      setDblClickAction('zoomOut')
    }

    if (dblClickAction === 'zoomOut') {
      event.preventDefault()
      scaleToFit(200)
    }
  }

  useEffect(() => {
    if (typeof window === 'undefined') return

    document.addEventListener('dblclick', handleDoubleClick)

    return () => {
      document.removeEventListener('dblclick', handleDoubleClick)
    }
  }, [dblClickAction])

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === '0') {
      event.preventDefault()
      scaleToFit(200)
    }
  }

  useEffect(() => {
    if (typeof window === 'undefined') return

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

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
