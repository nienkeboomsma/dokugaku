import '@mantine/core/styles.layer.css'
import 'mantine-datatable/styles.layer.css'
import { ColorSchemeScript, MantineProvider } from '@mantine/core'

import { ApolloWrapper } from '../graphql/ApolloWrapper'
import AppShell from '../components/AppShell/AppShell'

export const metadata = {
  title: 'Dokugaku',
  description: 'Read Japanese manga and novels with frequency lists',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <ApolloWrapper>
          <MantineProvider
            defaultColorScheme='auto'
            theme={{ primaryColor: 'blue' }}
          >
            <AppShell>{children}</AppShell>
          </MantineProvider>
        </ApolloWrapper>
      </body>
    </html>
  )
}
