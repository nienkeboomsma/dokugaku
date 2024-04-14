import { Badge } from '@mantine/core'

import { ReadStatus } from '../../types/Work'

export default function WorkStatusBadge({ status }: { status: ReadStatus }) {
  return (
    <Badge
      color={status === 'abandoned' ? 'gray' : undefined}
      variant={
        status === 'want to read'
          ? 'outline'
          : status === 'reading'
            ? 'light'
            : 'filled'
      }
      radius='sm'
    >
      {status}
    </Badge>
  )
}
