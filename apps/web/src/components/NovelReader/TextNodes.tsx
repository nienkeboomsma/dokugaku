'use client'

import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  Fragment,
  memo,
  useCallback,
} from 'react'
import { useRouter } from 'next/navigation'
import { notifications } from '@mantine/notifications'

import type { NovelJSONContent } from '../../types/NovelJSONContent'
import NovelBookmark from './NovelBookmark'

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
  'strong',
]

const elementIsOrContainsBlockImage = (element: string | NovelJSONContent) => {
  if (typeof element === 'string') return false

  if (element.type === 'img' && element.attributes?.title !== 'inline')
    return true

  if (!element.content || typeof element.content === 'string') return false

  for (const child of element.content) {
    if (elementIsOrContainsBlockImage(child)) {
      return true
    }
  }

  return false
}

const ContentNodes = memo(function ContentNodes({
  fileDir,
  nodes,
  progress,
  setProgress,
  saveBookmark,
}: {
  fileDir: string
  nodes: NovelJSONContent['content']
  progress: number
  setProgress: Dispatch<SetStateAction<number>>
  saveBookmark: (newProgress: number) => Promise<number>
}) {
  if (!nodes) return

  return nodes.map((node) => {
    if (typeof node === 'string') {
      return <Fragment key={uniqueKey++}>{node}</Fragment>
    }

    return (
      <RenderNode
        key={uniqueKey++}
        node={node}
        fileDir={fileDir}
        progress={progress}
        setProgress={setProgress}
        saveBookmark={saveBookmark}
      />
    )
  })
})

const ParentNode = memo(function ParentNode({
  children,
  node,
  fileDir,
  progress,
  setProgress,
  saveBookmark,
}: {
  children?: ReactNode
  node: NovelJSONContent
  fileDir: string
  progress: number
  setProgress: Dispatch<SetStateAction<number>>
  saveBookmark: (newProgress: number) => Promise<number>
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
        src={`${fileDir}${node.attributes.src}`}
      />
    )
  }

  return (
    <Component>
      <ContentNodes
        fileDir={fileDir}
        nodes={node.content}
        progress={progress}
        setProgress={setProgress}
        saveBookmark={saveBookmark}
      />
      {children}
    </Component>
  )
})

const RenderNode = memo(function RenderNode({
  node,
  fileDir,
  progress,
  setProgress,
  saveBookmark,
}: {
  node: NovelJSONContent
  fileDir: string
  progress: number
  setProgress: Dispatch<SetStateAction<number>>
  saveBookmark: (newProgress: number) => Promise<number>
}) {
  const paragraphNumber = node.paragraphNumber

  if (!paragraphNumber) {
    return (
      <ParentNode
        node={node}
        fileDir={fileDir}
        progress={progress}
        setProgress={setProgress}
        saveBookmark={saveBookmark}
      />
    )
  }

  const isSavedBookmark = progress === paragraphNumber

  const router = useRouter()
  const memoizedSaveBookmark = useCallback(async () => {
    try {
      const newProgress = !isSavedBookmark ? paragraphNumber : 0
      const updatedProgress = await saveBookmark(newProgress)
      setProgress(updatedProgress)

      // This flushes the NextJS router cache
      router.refresh()
    } catch (err) {
      console.log(err)
      notifications.show({
        title: 'Unable to save progress',
        message: (
          <span>
            Are the <code>db</code> and <code>graphql</code> containers running?
          </span>
        ),
        color: 'red',
        style: { direction: 'ltr' },
      })
    }
  }, [paragraphNumber, isSavedBookmark])

  return (
    <ParentNode
      node={node}
      fileDir={fileDir}
      progress={progress}
      setProgress={setProgress}
      saveBookmark={saveBookmark}
    >
      {node.type !== 'hr' && !elementIsOrContainsBlockImage(node) && (
        <NovelBookmark
          isSavedBookmark={isSavedBookmark}
          key={`bookmark-${paragraphNumber}`}
          paragraphNumber={paragraphNumber}
          saveBookmark={memoizedSaveBookmark}
        />
      )}
    </ParentNode>
  )
})

export default function TextNodes({
  progress,
  setProgress,
  textNodes,
  saveBookmark,
  fileDir,
}: {
  progress: number
  setProgress: Dispatch<SetStateAction<number>>
  textNodes: NovelJSONContent[]
  saveBookmark: (newProgress: number) => Promise<number>
  fileDir: string
}) {
  uniqueKey = 0

  return textNodes.map((node) => (
    <RenderNode
      key={uniqueKey++}
      node={node}
      fileDir={fileDir}
      progress={progress}
      setProgress={setProgress}
      saveBookmark={saveBookmark}
    />
  ))
}
