import Providers from '../../../../components/Providers'

export default function MangaReaderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Providers>{children}</Providers>
}
