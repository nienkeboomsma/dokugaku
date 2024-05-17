'use client'

import { Fragment, type ReactNode } from 'react'

import type { NovelJSONContent } from '../../types/NovelJSONContent'
import Bookmark from './Bookmark'

// none of these components will ever change their relative order, nor will
// any components ever be added or removed, so I think this is fine
let uniqueKey = 0

function ContentNodes({ children }: { children: NovelJSONContent['content'] }) {
  return children.map((child) => {
    if (typeof child === 'string') {
      return <Fragment key={uniqueKey++}>{child}</Fragment>
    }

    return <ParentNode key={uniqueKey++} node={child} />
  })
}

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
  updateProgress: (paragraphNumber: number) => void
}) {
  return textNodes.map((parentNode, index) => (
    <ParentNode key={uniqueKey++} node={parentNode}>
      <Bookmark
        progress={progress}
        key={`bookmark-${index + 1}`}
        paragraphNumber={index + 1}
        updateProgress={updateProgress}
      />
    </ParentNode>
  ))
}
