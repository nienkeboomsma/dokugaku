import { Burger } from '@mantine/core'

import classes from './Header.module.css'
import Logo from './Logo'
import DesktopNav from './DesktopNav'

export default function Header({
  mobileNavOpen,
  toggleMobileNav,
}: {
  mobileNavOpen: boolean
  toggleMobileNav: () => void
}) {
  return (
    <div className={classes.headerContent}>
      <Burger
        opened={mobileNavOpen}
        onClick={toggleMobileNav}
        hiddenFrom='sm'
        size='sm'
      />
      <div className={classes.logoAndNav}>
        <Logo />
        <DesktopNav visibleFrom='sm' />
      </div>
    </div>
  )
}
