import type { Meta, StoryObj } from '@storybook/react'

import WorkSkeleton from '../../components/Work/WorkSkeleton'
import { ApolloMockedProvider } from '../../../.storybook/decorators/mocks'
import { frequencyList } from '../../../.storybook/mocks/frequencyList'
import { glossary } from '../../../.storybook/mocks/glossary'
import { updateExcludedStatus } from '../../../.storybook/mocks/updateExcludedStatus'
import { updateIgnoredStatus } from '../../../.storybook/mocks/updateIgnoredStatus'
import { updateKnownStatus } from '../../../.storybook/mocks/updateKnownStatus'
import { updateWorkReadStatus } from '../../../.storybook/mocks/updateWorkReadStatus'

const meta = {
  title: 'Work/Page skeleton',
  component: WorkSkeleton,
  decorators: [
    ApolloMockedProvider([
      frequencyList,
      glossary,
      updateExcludedStatus,
      updateIgnoredStatus,
      updateKnownStatus,
      updateWorkReadStatus,
    ]),
  ],
} satisfies Meta<typeof WorkSkeleton>

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export default meta
