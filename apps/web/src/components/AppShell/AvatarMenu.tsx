import { Menu } from '@mantine/core'
import Link from 'next/link'

const links = [
  { label: 'Known words', href: '/user/known-words' },
  { label: 'Excluded words', href: '/user/excluded-words' },
]

export default function AvatarMenu({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Menu
      trigger='click-hover'
      loop={false}
      withinPortal={false}
      trapFocus={false}
      menuItemTabIndex={0}
      position='bottom-end'
    >
      <Menu.Target>{children}</Menu.Target>
      <Menu.Dropdown>
        {links.map((link) => (
          <Menu.Item component={Link} href={link.href} key={link.href}>
            {link.label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  )
}
