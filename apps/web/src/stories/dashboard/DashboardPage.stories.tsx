import type { Meta, StoryObj } from '@storybook/react'

import DashboardPage from '../../components/DashboardPage/DashboardPage'
import { mockCurrentWorks } from '../../fixtures/currentWorks'
import { mockVocab } from '../../fixtures/vocab'

const meta = {
  title: 'Dashboard/Page',
  component: DashboardPage,
} satisfies Meta<typeof DashboardPage>

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    works: mockCurrentWorks,
    initialVocab: mockVocab,
  },
}

export default meta
