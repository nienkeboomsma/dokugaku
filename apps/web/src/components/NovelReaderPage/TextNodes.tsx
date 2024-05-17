'use client'

import { Fragment, type ReactNode } from 'react'

import type { NovelJSONContent } from '../../types/NovelJSONContent'
import Bookmark from './Bookmark'

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

function ContentNodes({ children }: { children: NovelJSONContent['content'] }) {
  return children.map((child, index) => {
    if (typeof child === 'string') {
      return <Fragment key={child}>{child}</Fragment>
    }

    return <ParentNode key={JSON.stringify(child)} node={child} />
  })
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
    <>
      <ParentNode key={`parentNode-${index}`} node={parentNode}>
        <Bookmark
          progress={progress}
          key={`bookmark-${index}`}
          paragraphNumber={index + 1}
          updateProgress={updateProgress}
        />
      </ParentNode>
    </>
  ))
}
