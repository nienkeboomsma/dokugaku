import type { Meta, StoryObj } from '@storybook/react'

import CurrentWorks from '../../components/DashboardPage/CurrentWorks'
import { mockCurrentWorks } from '../../fixtures/currentWorks'

const meta = {
  title: 'Dashboard/Current works',
  component: CurrentWorks,
} satisfies Meta<typeof CurrentWorks>

type Story = StoryObj<typeof meta>

export const CurrentlyReading: Story = {
  args: {
    works: mockCurrentWorks,
  },
}

export default meta
