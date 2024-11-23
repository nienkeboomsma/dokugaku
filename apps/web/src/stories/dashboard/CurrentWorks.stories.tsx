import type { Meta, StoryObj } from '@storybook/react'

import CurrentWorks from '../../components/Dashboard/CurrentWorks'
import { mockCurrentWorks } from '../../../.storybook/fixtures/currentWorks'
import { resizer } from '../../../.storybook/decorators/resizer'

const meta = {
  title: 'Dashboard/Current works',
  component: CurrentWorks,
} satisfies Meta<typeof CurrentWorks>

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    works: mockCurrentWorks.slice(0, 3),
  },
}

export const Overflow: Story = {
  args: {
    works: mockCurrentWorks,
  },
  decorators: [resizer({ padding: '1rem', width: '40rem' })],
}

export const NoData: Story = {
  args: {
    works: undefined,
  },
}

export default meta
