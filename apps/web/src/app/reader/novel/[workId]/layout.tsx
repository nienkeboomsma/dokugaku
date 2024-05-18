import Providers from '../../../../components/Providers'

export default function NovelReaderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Providers direction='rtl'>{children}</Providers>
}
