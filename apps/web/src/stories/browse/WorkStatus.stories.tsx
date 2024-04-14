import type { Meta, StoryObj } from '@storybook/react'
import WorkStatusBadge from '../../components/BrowsePage/WorkStatusBadge'

const meta = {
  title: 'Browse/Work status badge',
  component: WorkStatusBadge,
} satisfies Meta<typeof WorkStatusBadge>

type Story = StoryObj<typeof meta>

export const WantToRead: Story = {
  args: {
    status: 'want to read',
  },
}

export const Reading: Story = {
  args: {
    status: 'reading',
  },
}

export const Read: Story = {
  args: {
    status: 'read',
  },
}

export const Abandoned: Story = {
  args: {
    status: 'abandoned',
  },
}

export default meta
