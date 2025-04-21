import { Dispatch, SetStateAction } from 'react'
import { Checkbox } from '@mantine/core'

export default function ResultsFilter({
  includeUnread,
  setIncludeUnread,
}: {
  includeUnread: boolean
  setIncludeUnread: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <Checkbox
      checked={includeUnread}
      label={'Include unread'}
      onChange={(e) => setIncludeUnread(e.currentTarget.checked)}
    />
  )
}
