import classes from './layout.module.css'
import Providers from '../../../../components/Providers'

export default function MangaReaderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Providers bodyClassName={classes.body ?? ''}>{children}</Providers>
}
