import { Title } from '@mantine/core'
import Link from 'next/link'

export default function Logo() {
  return (
    <Link href='/' style={{ textDecoration: 'none' }}>
      <Title
        order={1}
        c={'var(--mantine-primary-color-filled)'}
        size={'h2'}
        fw={600}
        ff="'Hiragino Sans','Meiryo','Hiragino Kaku Gothic ProN',sans-serif"
      >
        読学
      </Title>
    </Link>
  )
}
