import { Text } from '@mantine/core'

import TruncateToSingleLine from './TruncateToSingleLine'
import InlineUnorderedList from './InlineUnorderedList'

function Author({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <Text c='dimmed' className={className} lh={1} span>
      {children}
    </Text>
  )
}

export default function AuthorList({
  authors,
  classNames,
}: {
  authors: string[]
  classNames?: {
    author?: string
  }
}) {
  if (authors.length === 1) {
    return (
      <TruncateToSingleLine dotColor='var(--mantine-color-dimmed)'>
        <Author className={classNames?.author}>{authors[0]}</Author>
      </TruncateToSingleLine>
    )
  }

  return (
    <TruncateToSingleLine dotColor='var(--mantine-color-dimmed)'>
      <InlineUnorderedList
        classNames={{ listItem: classNames?.author }}
        display='inline'
        listItems={authors}
        listItemWrapper={Author}
      />
    </TruncateToSingleLine>
  )
}
