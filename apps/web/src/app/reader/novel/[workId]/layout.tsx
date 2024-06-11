import classes from './layout.module.css'
import Providers from '../../../../components/Providers'

export default function NovelReaderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers bodyClassName={classes.body ?? ''} direction='rtl'>
      {children}
    </Providers>
  )
}
