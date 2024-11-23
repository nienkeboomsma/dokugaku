import type { Meta, StoryObj } from '@storybook/react'

import BrowsePage from '../../components/Browse/Browse'
import { mockWorkCards } from '../../../.storybook/fixtures/workCards'

const meta = {
  title: 'Browse/Page',
  component: BrowsePage,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof BrowsePage>

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    data: mockWorkCards,
    loading: false,
  },
  decorators: [
    (Story, context) => (
      <div style={{ padding: '1rem' }}>
        <Story {...context.args} />
      </div>
    ),
  ],
}

export const Loading: Story = {
  args: {
    loading: true,
  },
  decorators: [
    (Story, context) => (
      <div style={{ padding: '1rem' }}>
        <Story {...context.args} />
      </div>
    ),
  ],
}

export default meta
