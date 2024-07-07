'use client'

import { useEffect, useState } from 'react'
import { Progress } from '@mantine/core'

import classes from './NovelReader.module.css'
import type { NovelJSONContent } from '../../types/NovelJSONContent'
import useNovelReaderDirection from '../../hooks/useNovelReaderDirection'
import { useCharacterCount } from '../../hooks/useCharacterCount'
import { getPercentage } from '../../util/getPercentage'
import NovelReaderMenu from './NovelReaderMenu'
import CharacterCount from './CharacterCount'
import TextContainer from './TextContainer'
import TextNodes from './TextNodes'

export default function NovelReader({
  initialProgress,
  textNodes,
  updateProgress,
  workId,
}: {
  initialProgress: number
  textNodes: NovelJSONContent[]
  updateProgress: (newProgress: number) => Promise<number>
  workId: string
}) {
  const [progress, setProgress] = useState(initialProgress)
  const { direction, toggleDirection } = useNovelReaderDirection('vertical')
  const charCount = useCharacterCount()
  const maxProgress = textNodes.length

  useEffect(() => {
    const bodyElement = document.body.querySelector(`#bookmark-${progress}`)

    if (!bodyElement) return

    bodyElement.scrollIntoView({ block: 'center' })
  }, [direction])

  return (
    <>
      <Progress
        classNames={{
          root: classes.progressRoot,
          section: classes.progressSection,
        }}
        radius={0}
        size='xs'
        value={getPercentage(progress, maxProgress)}
      />
      <NovelReaderMenu
        direction={direction}
        maxProgress={maxProgress}
        progress={progress}
        toggleDirection={toggleDirection}
        workId={workId}
      />
      <CharacterCount charCount={charCount} hideBelow={10} />
      <TextContainer direction={direction}>
        <TextNodes
          progress={progress}
          setProgress={setProgress}
          textNodes={textNodes}
          updateProgress={updateProgress}
        />
      </TextContainer>
    </>
  )
}
