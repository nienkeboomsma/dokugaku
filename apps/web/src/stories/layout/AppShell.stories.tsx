import type { Meta, StoryObj } from '@storybook/react'

import AppShell from '../../components/AppShell/AppShell'

const meta = {
  title: 'Layout/App shell',
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
