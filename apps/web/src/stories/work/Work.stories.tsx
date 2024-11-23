import type { Meta, StoryObj } from '@storybook/react'

import Work from '../../components/Work/Work'
import { ApolloMockedProvider } from '../../../.storybook/decorators/mocks'
import { frequencyList } from '../../../.storybook/mocks/frequencyList'
import { glossary } from '../../../.storybook/mocks/glossary'
import { updateExcludedStatus } from '../../../.storybook/mocks/updateExcludedStatus'
import { updateIgnoredStatus } from '../../../.storybook/mocks/updateIgnoredStatus'
import { updateKnownStatus } from '../../../.storybook/mocks/updateKnownStatus'
import { updateWorkReadStatus } from '../../../.storybook/mocks/updateWorkReadStatus'
import { mockWorkInfo } from '../../../.storybook/fixtures/workInfo'
import type { WorkInfo } from '../../types/WorkInfo'

const meta = {
  title: 'Work/Page',
  component: Work,
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
} satisfies Meta<typeof Work>

type Story = StoryObj<typeof meta>

export const InSeries: Story = {
  args: {
    work: mockWorkInfo[0] as WorkInfo,
  },
}

export const NotInSeries: Story = {
  args: {
    work: mockWorkInfo[1] as WorkInfo,
  },
}

export default meta
