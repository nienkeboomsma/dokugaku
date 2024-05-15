import type { Meta, StoryObj } from '@storybook/react'

import SettingsPage from '../../components/SettingsPage/SettingsPage'

const meta = {
  title: 'Settings/Page',
  component: SettingsPage,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SettingsPage>

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export default meta
