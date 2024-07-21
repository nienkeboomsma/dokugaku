'use client'

import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  Fragment,
  memo,
  useCallback,
} from 'react'
import { notifications } from '@mantine/notifications'

import type { NovelJSONContent } from '../../types/NovelJSONContent'
import Bookmark from './Bookmark'

// Is this hacky? Yes. Does it work? Also yes.
// None of these components will change their order or be added/removed between
// renders, so each component will have the same key on each render.
let uniqueKey: number

const validTags: Array<keyof JSX.IntrinsicElements> = [
  'blockquote',
  'em',
  'h1',
  'h2',
  'h3',
  'h4',
  'hr',
  'img',
  'p',
  'ruby',
  'rt',
]

const elementContainsBlockImage = (element: string | NovelJSONContent) => {
  if (typeof element === 'string') return false

  if (element.type === 'img' && element.attributes?.title !== 'inline')
    return true

  if (!element.content || typeof element.content === 'string') return false

  for (const child of element.content) {
    if (elementContainsBlockImage(child)) {
      return true
    }
  }

  return false
}

const ContentNodes = memo(function ContentNodes({
  children,
  fileDir,
}: {
  children: NovelJSONContent['content']
  fileDir: string
}) {
  if (!children) return

  return children.map((child) => {
    if (typeof child === 'string') {
      return <Fragment key={uniqueKey++}>{child}</Fragment>
    }

    return <ParentNode key={uniqueKey++} node={child} fileDir={fileDir} />
  })
})

function ParentNode({
  children,
  node,
  fileDir,
}: {
  children?: ReactNode
  node: NovelJSONContent
  fileDir: string
}) {
  const Component = validTags.includes(node.type) ? node.type : 'span'

  if (Component === 'hr') return <Component />

  if (Component === 'img') {
    if (!node.attributes || !('src' in node.attributes)) return

    const isInlineImage = node.attributes.title === 'inline'

    return (
      <Component
        alt={node.attributes.alt}
        className={isInlineImage ? 'inline' : 'block'}
        src={`${fileDir}/${node.attributes.src}`}
      />
    )
  }

  return (
    <Component>
      <ContentNodes fileDir={fileDir}>{node.content}</ContentNodes>
      {children}
    </Component>
  )
}

export default function TextNodes({
  progress,
  setProgress,
  textNodes,
  updateProgress,
  fileDir,
}: {
  progress: number
  setProgress: Dispatch<SetStateAction<number>>
  textNodes: NovelJSONContent[]
  updateProgress: (newProgress: number) => Promise<number>
  fileDir: string
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
        notifications.show({
          title: 'Something went wrong',
          message: 'Please try again later',
          style: { direction: 'ltr' },
        })
      }
    }, [paragraphNumber, isCurrentProgress])

    return (
      <ParentNode
        key={`paragraph-${paragraphNumber}`}
        node={parentNode}
        fileDir={fileDir}
      >
        {parentNode.content && !elementContainsBlockImage(parentNode) && (
          <Bookmark
            isCurrentProgress={isCurrentProgress}
            key={`bookmark-${paragraphNumber}`}
            paragraphNumber={paragraphNumber}
            updateProgress={memoizedUpdateProgress}
          />
        )}
      </ParentNode>
    )
  })
}
