import Link from 'next/link'

import classes from './ScaleLink.module.css'

export default function ScaleLink({
  children,
  href,
}: {
  children: React.ReactNode
  href: string
}) {
  return (
    <Link className={classes.link} href={href}>
      {children}
    </Link>
  )
}
