import { NavLink } from '@mantine/core'
import Link from 'next/link'

const links = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Browse', href: '/browse' },
  { label: 'Upload', href: '/upload' },
  { label: 'Known words', href: '/user/known-words' },
  { label: 'Excluded words', href: '/user/excluded-words' },
]

export default function MobileNav({ toggleNav }: { toggleNav: () => void }) {
  return (
    <>
      {links.map((link) => (
        <NavLink
          component={Link}
          href={link.href}
          key={link.href}
          label={link.label}
          onClick={toggleNav}
        />
      ))}
    </>
  )
}
