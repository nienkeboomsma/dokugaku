import type { Meta, StoryObj } from '@storybook/react'

import CurrentWorks from '../../components/DashboardPage/CurrentWorks'
import { mockCurrentWorks } from '../../../.storybook/fixtures/currentWorks'

const meta = {
  title: 'Dashboard/Current works',
  component: CurrentWorks,
} satisfies Meta<typeof CurrentWorks>

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    works: mockCurrentWorks,
  },
}

export const NoData: Story = {
  args: {
    works: undefined,
  },
}

export default meta
