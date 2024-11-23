import type { Meta, StoryObj } from '@storybook/react'

import Dashboard from '../../components/Dashboard/Dashboard'
import { ApolloMockedProvider } from '../../../.storybook/decorators/mocks'
import { recommendedWords } from '../../../.storybook/mocks/recommendedWords'
import { updateExcludedStatus } from '../../../.storybook/mocks/updateExcludedStatus'
import { updateKnownStatus } from '../../../.storybook/mocks/updateKnownStatus'
import { mockCurrentWorks } from '../../../.storybook/fixtures/currentWorks'

const meta = {
  title: 'Dashboard/Page',
  component: Dashboard,
  decorators: [
    ApolloMockedProvider([
      recommendedWords,
      updateExcludedStatus,
      updateKnownStatus,
    ]),
  ],
} satisfies Meta<typeof Dashboard>

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    currentWorks: mockCurrentWorks,
  },
}

export const NoCurrentWorks: Story = {
  args: {
    currentWorks: undefined,
  },
}

export default meta
