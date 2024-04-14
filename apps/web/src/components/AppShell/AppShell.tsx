'use client'

import { AppShell as MantineAppShell } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import classes from './AppShell.module.css'
import MobileNav from './MobileNav'
import Header from './Header'

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileNavOpen, { toggle: toggleMobileNav }] = useDisclosure()

  return (
    <MantineAppShell
      classNames={{
        header: classes.header,
        main: classes.main,
      }}
      header={{ height: 68 }}
      navbar={{
        width: '100%',
        breakpoint: 'sm',
        collapsed: { desktop: true, mobile: !mobileNavOpen },
      }}
      padding='lg'
    >
      <MantineAppShell.Header>
        <Header
          mobileNavOpen={mobileNavOpen}
          toggleMobileNav={toggleMobileNav}
        />
      </MantineAppShell.Header>

      <MantineAppShell.Navbar py='md' px={4}>
        <MobileNav toggleNav={toggleMobileNav} />
      </MantineAppShell.Navbar>

      <MantineAppShell.Main>{children}</MantineAppShell.Main>
    </MantineAppShell>
  )
}
