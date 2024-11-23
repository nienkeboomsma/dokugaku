import type { Meta, StoryObj } from '@storybook/react'

import BrowseSkeleton from '../../components/Browse/BrowseSkeleton'

const meta = {
  title: 'Browse/Page skeleton',
  component: BrowseSkeleton,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof BrowseSkeleton>

type Story = StoryObj<typeof meta>

export const Default: Story = {
  decorators: [
    (Story, context) => (
      <div style={{ padding: '1rem' }}>
        <Story {...context.args} />
      </div>
    ),
  ],
}

export default meta
