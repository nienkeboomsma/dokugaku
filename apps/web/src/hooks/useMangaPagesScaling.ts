import { useElementSize, useHotkeys } from '@mantine/hooks'
import { useEffect, useRef, useState } from 'react'
import { ReactZoomPanPinchRef } from 'react-zoom-pan-pinch'

import { Page } from '../types/MangaPage'

type Zoom = 'zoomIn' | 'zoomOut'

export default function useMangaPagesScaling(pages: Array<Page | undefined>) {
  const [dblClickAction, setDblClickAction] = useState<Zoom>()
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

  useHotkeys([['0', () => scaleToFit(200), { preventDefault: true }]])

  return {
    dblClickAction,
    resizeObserverRef,
    setDblClickAction,
    transformComponentRef,
  }
}
