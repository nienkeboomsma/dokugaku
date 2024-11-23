import type { Meta, StoryObj } from '@storybook/react'

import DashboardSkeleton from '../../components/Dashboard/DashboardSkeleton'
import { ApolloMockedProvider } from '../../../.storybook/decorators/mocks'
import { recommendedWords } from '../../../.storybook/mocks/recommendedWords'
import { updateExcludedStatus } from '../../../.storybook/mocks/updateExcludedStatus'
import { updateKnownStatus } from '../../../.storybook/mocks/updateKnownStatus'

const meta = {
  title: 'Dashboard/Page skeleton',
  component: DashboardSkeleton,
  decorators: [
    ApolloMockedProvider([
      recommendedWords,
      updateExcludedStatus,
      updateKnownStatus,
    ]),
  ],
} satisfies Meta<typeof DashboardSkeleton>

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export default meta
