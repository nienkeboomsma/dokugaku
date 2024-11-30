import { Title } from '@mantine/core'
import Link from 'next/link'

import classes from './Logo.module.css'

export default function Logo() {
  return (
    <Link href='/'>
      <Title className={`${classes.logo} japanese`} order={1} size={'h2'}>
        読学
      </Title>
    </Link>
  )
}
