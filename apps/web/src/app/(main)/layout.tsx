import AppShell from '../../components/AppShell/AppShell'
import Providers from '../../components/Providers'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <AppShell>{children}</AppShell>
    </Providers>
  )
}
