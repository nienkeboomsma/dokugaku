import { Metadata } from 'next'
import classes from './layout.module.css'
import Providers from '../../../../components/Providers'

export const metadata: Metadata = {
  icons:
    'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📚</text></svg>',
}

export default function MangaReaderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Providers bodyClassName={classes.body ?? ''}>{children}</Providers>
}
