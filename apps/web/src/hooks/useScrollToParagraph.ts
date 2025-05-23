import { useEffect } from 'react'

import { Direction } from './useNovelReaderDirection'
import { scrollToParagraph } from '../util/scrollToParagraph'

export default function useScrollToParagraph(
  direction: Direction,
  fontSizeMultiplier: number,
  lineHeightMultiplier: number,
  paragraph: number,
  setOutline: boolean
) {
  // CLS interferes with the scroll target in vertical mode. Setting the
  // width/height attributes of each img to match the intrinsic aspect ratio
  // solves the issue. The width/height is subsequently overridden in CSS.
  useEffect(() => {
    if (direction === 'horizontal') scrollToParagraph(paragraph, setOutline)

    const imgs = Array.from(document.querySelectorAll('img')) as Array<
      HTMLImageElement & { error?: boolean }
    >

    // There is no need to do this if there are no images or if all images are
    // already fully loaded by the time the direction changes.
    if (imgs.length === 0 || imgs.every((img) => img.naturalWidth))
      return scrollToParagraph(paragraph, setOutline)

    const errorListenerCleanups: Array<() => void> = []
    const checkNaturalWidthCleanups: Array<() => void> = []

    imgs.forEach((img) => {
      const errorHandler = () => {
        img.error = true
      }

      img.addEventListener('error', errorHandler)
      const errorListenerCleanup = () => {
        img.removeEventListener('error', errorHandler)
      }
      errorListenerCleanups.push(errorListenerCleanup)

      const checkNaturalWidth = setInterval(() => {
        if (img.error) {
          clearInterval(checkNaturalWidth)
        }

        if (img.naturalWidth) {
          clearInterval(checkNaturalWidth)
          img.width = img.naturalWidth
          img.height = img.naturalHeight
        }
      }, 10)

      const checkNaturalWidthCleanup = () => clearInterval(checkNaturalWidth)
      checkNaturalWidthCleanups.push(checkNaturalWidthCleanup)
    })

    const checkReadyToScroll = setInterval(() => {
      if (imgs.every((img) => img.width || img.error)) {
        clearInterval(checkReadyToScroll)
        scrollToParagraph(paragraph, setOutline)
      }
    }, 10)

    const effectCleanup = () => {
      errorListenerCleanups.forEach((cleanup) => cleanup())
      checkNaturalWidthCleanups.forEach((cleanup) => cleanup())
      clearInterval(checkReadyToScroll)
    }

    return effectCleanup
  }, [direction, fontSizeMultiplier, lineHeightMultiplier])
}
