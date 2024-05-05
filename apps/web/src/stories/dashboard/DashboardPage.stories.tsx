import type { Meta, StoryObj } from '@storybook/react'

import DashboardPage from '../../components/DashboardPage/DashboardPage'
import { ApolloMockedProvider } from '../../../.storybook/decorators/mocks'
import { recommendedWords } from '../../../.storybook/mocks/recommendedWords'
import { updateExcludedStatus } from '../../../.storybook/mocks/updateExcludedStatus'
import { updateKnownStatus } from '../../../.storybook/mocks/updateKnownStatus'
import { mockCurrentWorks } from '../../../.storybook/fixtures/currentWorks'

const meta = {
  title: 'Dashboard/Page',
  component: DashboardPage,
  decorators: [
    ApolloMockedProvider([
      recommendedWords,
      updateExcludedStatus,
      updateKnownStatus,
    ]),
  ],
} satisfies Meta<typeof DashboardPage>

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
