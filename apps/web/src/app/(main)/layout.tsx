import classes from './layout.module.css'
import AppShell from '../../components/MainLayout/AppShell'
import Providers from '../../components/Providers'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers bodyClassName={classes.body ?? ''}>
      <AppShell>{children}</AppShell>
    </Providers>
  )
}
