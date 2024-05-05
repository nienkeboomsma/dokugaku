import { Badge } from '@mantine/core'
import { GQL_ReadStatus } from '@repo/graphql-types/'

export default function WorkStatusBadge({
  className,
  status,
}: {
  className?: string
  status: GQL_ReadStatus
}) {
  const displayStatus = status.replaceAll('_', ' ')

  return (
    <Badge
      className={className}
      color={
        status === GQL_ReadStatus.Abandoned || status === GQL_ReadStatus.New
          ? 'gray'
          : undefined
      }
      variant={
        status === GQL_ReadStatus.WantToRead || status === GQL_ReadStatus.New
          ? 'outline'
          : status === GQL_ReadStatus.Reading
            ? 'light'
            : 'filled'
      }
      radius='sm'
    >
      {displayStatus}
    </Badge>
  )
}
