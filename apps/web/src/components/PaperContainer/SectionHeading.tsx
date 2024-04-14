import { Title } from '@mantine/core'

import classes from './SectionHeading.module.css'

export default function SectionHeading({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Title className={classes.title} order={2} size='h4'>
      {children}
    </Title>
  )
}
