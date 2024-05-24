import '../src/styles/global.css'
import '@mantine/core/styles.layer.css'
import 'mantine-datatable/styles.layer.css'
import React, { useEffect } from 'react'
import type { Preview } from '@storybook/react'
import { addons } from '@storybook/preview-api'
import { DARK_MODE_EVENT_NAME } from 'storybook-dark-mode'
import { MantineProvider, useMantineColorScheme } from '@mantine/core'

const channel = addons.getChannel()

export function ColorSchemeWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const { setColorScheme } = useMantineColorScheme()
  const handleColorScheme = (value: boolean) =>
    setColorScheme(value ? 'dark' : 'light')

  useEffect(() => {
    channel.on(DARK_MODE_EVENT_NAME, handleColorScheme)
    return () => channel.off(DARK_MODE_EVENT_NAME, handleColorScheme)
  }, [channel])

  return <>{children}</>
}

const preview: Preview = {
  decorators: [
    (Story) => (
      // TODO: define a theme file centrally
      <MantineProvider theme={{ primaryColor: 'blue' }}>
        <ColorSchemeWrapper>
          <Story />
        </ColorSchemeWrapper>
      </MantineProvider>
    ),
  ],
  parameters: {
    backgrounds: {
      default: 'light',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
    options: {
      storySort: {
        method: 'alphabetical',
      },
    },
  },
}

export default preview
