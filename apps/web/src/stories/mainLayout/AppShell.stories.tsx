import type { Meta, StoryObj } from '@storybook/react'

import AppShell from '../../components/MainLayout/AppShell'

const meta = {
  title: 'Main layout/App shell',
  component: AppShell,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof AppShell>

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: '' },
}

export default meta
