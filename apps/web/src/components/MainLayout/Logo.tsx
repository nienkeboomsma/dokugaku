import { Title } from '@mantine/core'
import Link from 'next/link'

import classes from './Logo.module.css'

export default function Logo() {
  return (
    <Link href='/' style={{ textDecoration: 'none' }}>
      <Title className={classes.logo} order={1} size={'h2'}>
        読学
      </Title>
    </Link>
  )
}
