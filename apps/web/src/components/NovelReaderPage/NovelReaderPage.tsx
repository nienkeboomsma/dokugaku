'use client'

import { useEffect } from 'react'

import type { NovelJSONContent } from '../../types/NovelJSONContent'
import useBookmarkProgress from '../../hooks/useBookmarkProgress'
import useNovelReaderDirection from '../../hooks/useNovelReaderDirection'
import NovelReaderMenu from './NovelReaderMenu'
import TextContainer from './TextContainer'
import TextNodes from './TextNodes'

export default function NovelReaderPage({
  initialProgress,
  textNodes,
  workId,
}: {
  initialProgress: number
  textNodes: NovelJSONContent[]
  workId: string
}) {
  const { direction, toggleDirection } = useNovelReaderDirection('vertical')
  const { progress, createUpdateProgress } =
    useBookmarkProgress(initialProgress)

  useEffect(() => {
    const bodyElement = document.body.querySelector(`#bookmark-${progress}`)

    if (!bodyElement) return

    bodyElement.scrollIntoView({ block: 'center' })
  }, [direction])

  return (
    <>
      <NovelReaderMenu
        direction={direction}
        toggleDirection={toggleDirection}
        workId={workId}
      />
      <TextContainer direction={direction}>
        <TextNodes
          progress={progress}
          textNodes={textNodes}
          updateProgress={createUpdateProgress(workId)}
        />
      </TextContainer>
    </>
  )
}