import type { Meta, StoryObj } from '@storybook/react'

import BrowsePage from '../../components/BrowsePage/BrowsePage'
import { mockWorkCards } from '../../fixtures/workCards'

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
    initialWorkCards: mockWorkCards,
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
