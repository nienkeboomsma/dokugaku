'use client'

import {
  type Dispatch,
  Fragment,
  type SetStateAction,
  memo,
  useCallback,
  type ReactNode,
} from 'react'
import { notifications } from '@mantine/notifications'

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
  setProgress,
  textNodes,
  updateProgress,
}: {
  progress: number
  setProgress: Dispatch<SetStateAction<number>>
  textNodes: NovelJSONContent[]
  updateProgress: (newProgress: number) => Promise<number>
}) {
  uniqueKey = 0

  return textNodes.map((parentNode, index) => {
    const paragraphNumber = index + 1
    const isCurrentProgress = progress === paragraphNumber

    const memoizedUpdateProgress = useCallback(async () => {
      try {
        const newProgress = !isCurrentProgress ? paragraphNumber : 0
        const updatedProgress = await updateProgress(newProgress)
        setProgress(updatedProgress)
      } catch {
        console.log('catch')
        notifications.show({
          title: 'Something went wrong',
          message: 'Please try again later',
          style: { direction: 'ltr' },
        })
      }
    }, [paragraphNumber, isCurrentProgress])

    return (
      <ParentNode key={`paragraph-${paragraphNumber}`} node={parentNode}>
        <Bookmark
          isCurrentProgress={isCurrentProgress}
          key={`bookmark-${paragraphNumber}`}
          paragraphNumber={paragraphNumber}
          updateProgress={memoizedUpdateProgress}
        />
      </ParentNode>
    )
  })
}
