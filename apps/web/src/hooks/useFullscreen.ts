import { useEffect, useState } from 'react'
import { useHotkeys, useViewportSize } from '@mantine/hooks'

export default function useFullscreen() {
  const [fullscreen, setFullscreen] = useState(false)
  const { height, width } = useViewportSize()

  useEffect(() => {
    if (document.fullscreenElement && !fullscreen) setFullscreen(true)
    if (!document.fullscreenElement && fullscreen) setFullscreen(false)
  }, [height, width])

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
      setFullscreen(false)
    }

    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setFullscreen(true)
    }
  }

  useHotkeys([['f', () => toggleFullscreen(), { preventDefault: true }]])

  return { fullscreen, toggleFullscreen }
}
