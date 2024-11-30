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
      <Title className='japanese' order={order} size={size} fw={600}>
        {children}
      </Title>
    </TruncateToSingleLine>
  )
}
