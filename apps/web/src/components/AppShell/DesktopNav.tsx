import { ActionIcon, Box, UnstyledButton } from '@mantine/core'
import Link from 'next/link'
import { IconUserCircle } from '@tabler/icons-react'

import classes from './DesktopNav.module.css'
import AvatarMenu from './AvatarMenu'

const links = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Browse', href: '/browse' },
  { label: 'Upload', href: '/upload' },
]

export default function DesktopNav({ visibleFrom }: { visibleFrom: string }) {
  return (
    <Box className={classes.container} visibleFrom={visibleFrom}>
      {links.map((link) => (
        <UnstyledButton
          className={classes.control}
          component={Link}
          href={link.href}
          key={link.href}
        >
          {link.label}
        </UnstyledButton>
      ))}
      <AvatarMenu>
        <ActionIcon
          variant='light'
          ml='md'
          radius='xl'
          size='lg'
          aria-label='User settings'
        >
          <IconUserCircle size='70%' stroke={1.5} />
        </ActionIcon>
      </AvatarMenu>
    </Box>
  )
}
