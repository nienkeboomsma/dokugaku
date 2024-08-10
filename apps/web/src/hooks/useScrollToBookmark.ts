import { useEffect } from 'react'

import { Direction } from './useNovelReaderDirection'

export default function useScrollToBookmark(
  direction: Direction,
  progress: number
) {
  const scrollToBookmark = () => {
    const bodyElement = document.body.querySelector(`#bookmark-${progress}`)

    if (!bodyElement) return

    bodyElement.scrollIntoView({ block: 'center' })
  }

  useEffect(() => {
    if (direction === 'horizontal') scrollToBookmark()

    // CLS interferes with the scroll target in vertical mode. Setting the
    // width/height attributes of each img to match the intrinsic aspect ratio
    // solves the issue. The width/height is subsequently overridden in CSS.

    const imgs = Array.from(document.querySelectorAll('img')) as Array<
      HTMLImageElement & { error?: boolean }
    >

    // There is no need to do this if all images are already fully loaded
    // by the time the direction changes.
    if (imgs.every((img) => img.naturalWidth)) return scrollToBookmark()

    imgs.forEach((img) => {
      img.addEventListener('error', () => {
        img.error = true
      })

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
    })

    const checkReadyToScroll = setInterval(() => {
      if (imgs.every((img) => img.width || img.error)) {
        clearInterval(checkReadyToScroll)
        scrollToBookmark()
      }
    }, 10)
  }, [direction])
}
