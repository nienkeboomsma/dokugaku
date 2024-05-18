'use client'

import { Fragment, memo, useCallback, type ReactNode } from 'react'

import type { NovelJSONContent } from '../../types/NovelJSONContent'
import Bookmark from './Bookmark'

// Is this hacky? Yes. Does it work? Also yes.
// None of these components will change their order or be added/removed between
// renders, so each component will have the same key on each render.
let uniqueKey: number

const ContentNodes = memo(function ContentNodes({
  children,
}: {
  children: NovelJSONContent['content']
}) {
  return children.map((child) => {
    if (typeof child === 'string') {
      return <Fragment key={uniqueKey++}>{child}</Fragment>
    }

    return <ParentNode key={uniqueKey++} node={child} />
  })
})

function ParentNode({
  children,
  node,
}: {
  children?: ReactNode
  node: NovelJSONContent
}) {
  const tags: Array<keyof JSX.IntrinsicElements> = [
    'h1',
    'h2',
    'h3',
    'h4',
    'p',
    'ruby',
    'rt',
  ]

  const Component = tags.includes(node.type) ? node.type : 'span'

  return (
    <Component>
      <ContentNodes>{node.content}</ContentNodes>
      {children}
    </Component>
  )
}

export default function TextNodes({
  progress,
  textNodes,
  updateProgress,
}: {
  progress: number
  textNodes: NovelJSONContent[]
  updateProgress: (paragraphNumber: number, isCurrentProgress: boolean) => void
}) {
  uniqueKey = 0

  return textNodes.map((parentNode, index) => {
    const paragraphNumber = index + 1
    const isCurrentProgress = progress === paragraphNumber

    return (
      <ParentNode key={`paragraph-${paragraphNumber}`} node={parentNode}>
        <Bookmark
          isCurrentProgress={isCurrentProgress}
          key={`bookmark-${paragraphNumber}`}
          paragraphNumber={paragraphNumber}
          updateProgress={useCallback(
            () => updateProgress(paragraphNumber, isCurrentProgress),
            [paragraphNumber, isCurrentProgress]
          )}
        />
      </ParentNode>
    )
  })
}
