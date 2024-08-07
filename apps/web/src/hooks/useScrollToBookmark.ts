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
    // width/height attributes to match the intrinsic aspect ratio of the image
    // solves the issue. The width/height is subsequently overridden in CSS.
    const imgs = document.querySelectorAll('img') as NodeListOf<
      HTMLImageElement & { error?: boolean }
    >

    for (const img of imgs) {
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
    }

    const checkReadyToScroll = setInterval(() => {
      let allImgsHaveWidths = true

      for (const img of imgs) {
        if (!img.width && !img.error) {
          allImgsHaveWidths = false
          break
        }
      }

      if (allImgsHaveWidths) {
        clearInterval(checkReadyToScroll)
        scrollToBookmark()
      }
    }, 10)
  }, [direction])
}
