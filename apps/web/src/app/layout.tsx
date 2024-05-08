import '../styles/global.css'
// TODO: import Mantine Core styles per component to reduce bundle size
import '@mantine/core/styles.layer.css'
import '@mantine/notifications/styles.layer.css'
import 'mantine-datatable/styles.layer.css'
import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'

import { ApolloWrapper } from '../graphql/client/ApolloWrapper'
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
      {/* Prevents this error: https://www.reddit.com/r/nextjs/comments/138smpm/how_to_fix_extra_attributes_from_the_server_error/ */}
      <head suppressHydrationWarning>
        <ColorSchemeScript />
      </head>
      <body>
        <ApolloWrapper>
          <MantineProvider
            defaultColorScheme='auto'
            theme={{ primaryColor: 'blue' }}
          >
            <Notifications />
            <AppShell>{children}</AppShell>
          </MantineProvider>
        </ApolloWrapper>
      </body>
    </html>
  )
}
