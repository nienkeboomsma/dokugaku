import { Badge, NumberFormatter } from '@mantine/core'

import classes from './CharacterCount.module.css'

export default function CharacterCount({
  charCount,
  hideBelow,
}: {
  charCount: number
  hideBelow: number
}) {
  return (
    charCount > hideBelow && (
      <Badge classNames={{ root: classes.charCount }}>
        <NumberFormatter
          suffix=' characters'
          thousandSeparator
          value={charCount}
        />
      </Badge>
    )
  )
}
