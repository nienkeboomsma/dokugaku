import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Browse',
}

export default function BrowseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
