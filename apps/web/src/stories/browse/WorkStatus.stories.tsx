import type { Meta, StoryObj } from '@storybook/react'
import { GQL_ReadStatus } from '@repo/graphql-types'

import WorkStatusBadge from '../../components/BrowsePage/WorkStatusBadge'

const meta = {
  title: 'Browse/Work status badge',
  component: WorkStatusBadge,
} satisfies Meta<typeof WorkStatusBadge>

type Story = StoryObj<typeof meta>

export const Abandoned: Story = {
  args: {
    status: GQL_ReadStatus.Abandoned,
  },
}

export const New: Story = {
  args: {
    status: GQL_ReadStatus.New,
  },
}

export const Read: Story = {
  args: {
    status: GQL_ReadStatus.Read,
  },
}

export const Reading: Story = {
  args: {
    status: GQL_ReadStatus.Reading,
  },
}

export const WantToRead: Story = {
  args: {
    status: GQL_ReadStatus.WantToRead,
  },
}

export default meta
