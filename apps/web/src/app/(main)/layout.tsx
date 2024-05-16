import AppShell from '../../components/AppShell/AppShell'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AppShell>{children}</AppShell>
}
