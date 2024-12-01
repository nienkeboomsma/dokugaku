'use client'

import { useState } from 'react'
import { Progress } from '@mantine/core'

import classes from './NovelReader.module.css'
import type { NovelJSONContent } from '../../types/NovelJSONContent'
import useNovelReaderDirection from '../../hooks/useNovelReaderDirection'
import { useCharacterCount } from '../../hooks/useCharacterCount'
import useScrollToBookmark from '../../hooks/useScrollToBookmark'
import { getPercentage } from '../../util/getPercentage'
import NovelReaderMenu from './NovelReaderMenu'
import CharacterCount from './CharacterCount'
import TextContainer from './TextContainer'
import TextNodes from './TextNodes'
import { useLocalStorage } from '@mantine/hooks'

export default function NovelReader({
  fileDir,
  initialProgress,
  maxProgress,
  textNodes,
  updateProgress,
  workId,
}: {
  fileDir: string
  initialProgress: number
  maxProgress: number
  textNodes: NovelJSONContent[]
  updateProgress: (newProgress: number) => Promise<number>
  workId: string
}) {
  const [progress, setProgress] = useState(initialProgress)
  const { direction, toggleDirection } = useNovelReaderDirection(
    'vertical',
    workId
  )

  const [fontSizeMultiplier, setFontSizeMultiplier] = useLocalStorage({
    defaultValue: 1,
    key: 'DOKUGAKU_FONT_SIZE',
  })
  const [lineHeightMultiplier, setLineHeightMultiplier] = useLocalStorage({
    defaultValue: 1,
    key: 'DOKUGAKU_LINE_HEIGHT',
  })
  const charCount = useCharacterCount()

  useScrollToBookmark(
    direction,
    fontSizeMultiplier,
    lineHeightMultiplier,
    progress
  )

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
        fontSizeMultiplier={fontSizeMultiplier}
        lineHeightMultiplier={lineHeightMultiplier}
        maxProgress={maxProgress}
        progress={progress}
        setFontSizeMultiplier={setFontSizeMultiplier}
        setLineHeightMultiplier={setLineHeightMultiplier}
        toggleDirection={toggleDirection}
        workId={workId}
      />
      <CharacterCount charCount={charCount} hideBelow={10} />
      <TextContainer
        direction={direction}
        fontSizeMultiplier={fontSizeMultiplier}
        lineHeightMultiplier={lineHeightMultiplier}
      >
        <TextNodes
          progress={progress}
          setProgress={setProgress}
          textNodes={textNodes}
          updateProgress={updateProgress}
          fileDir={fileDir}
        />
      </TextContainer>
    </>
  )
}
