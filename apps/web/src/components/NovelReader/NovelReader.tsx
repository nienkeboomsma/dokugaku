'use client'

import { useState } from 'react'
import { Progress } from '@mantine/core'

import classes from './NovelReader.module.css'
import type { NovelJSONContent } from '../../types/NovelJSONContent'
import useNovelReaderDirection from '../../hooks/useNovelReaderDirection'
import { useCharacterCount } from '../../hooks/useCharacterCount'
import useScrollToParagraph from '../../hooks/useScrollToParagraph'
import { getPercentage } from '../../util/getPercentage'
import NovelReaderMenu from './NovelReaderMenu'
import CharacterCount from './CharacterCount'
import TextContainer from './TextContainer'
import TextNodes from './TextNodes'
import { useLocalStorage } from '@mantine/hooks'
import HitsPagination from '../HitsPagination'
import { scrollToParagraph } from '../../util/scrollToParagraph'

export default function NovelReader({
  fileDir,
  hits,
  initialProgress,
  maxProgress,
  textNodes,
  updateProgress,
  workId,
}: {
  fileDir: string
  hits: number[]
  initialProgress: number
  maxProgress: number
  textNodes: NovelJSONContent[]
  updateProgress: (newProgress: number) => Promise<number>
  workId: string
}) {
  const [progress, setProgress] = useState(initialProgress)
  const [currentHitIndex, setCurrentHitIndex] = useState(0)
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

  useScrollToParagraph(
    direction,
    fontSizeMultiplier,
    lineHeightMultiplier,
    hits.length > 0 ? hits[currentHitIndex]! : progress,
    hits.length > 0
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
      <HitsPagination
        currentHitIndex={currentHitIndex}
        direction={direction == 'vertical' ? 'rtl' : 'ltr'}
        hits={hits}
        onChange={(value) => scrollToParagraph(value, true)}
        setCurrentHitIndex={setCurrentHitIndex}
      />
    </>
  )
}
