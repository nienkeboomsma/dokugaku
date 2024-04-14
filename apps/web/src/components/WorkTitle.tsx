import { Title, TitleOrder } from '@mantine/core'

import TruncateToSingleLine from './TruncateToSingleLine'

export default function WorkTitle({
  children,
  order,
  size,
}: {
  children: React.ReactNode
  order: TitleOrder
  size: string
}) {
  return (
    <TruncateToSingleLine>
      <Title order={order} size={size}>
        {children}
      </Title>
    </TruncateToSingleLine>
  )
}
