import type { Meta, StoryObj } from '@storybook/react'

import WorkPage from '../../components/WorkPage/WorkPage'
import { ApolloMockedProvider } from '../../../.storybook/decorators/mocks'
import { frequencyList } from '../../../.storybook/mocks/frequencyList'
import { glossary } from '../../../.storybook/mocks/glossary'
import { updateExcludedStatus } from '../../../.storybook/mocks/updateExcludedStatus'
import { updateIgnoredStatus } from '../../../.storybook/mocks/updateIgnoredStatus'
import { updateKnownStatus } from '../../../.storybook/mocks/updateKnownStatus'
import { updateWorkReadStatus } from '../../../.storybook/mocks/updateWorkReadStatus'
import { mockWorkInfo } from '../../../.storybook/fixtures/workInfo'

const meta = {
  title: 'Work/Page',
  component: WorkPage,
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
} satisfies Meta<typeof WorkPage>

type Story = StoryObj<typeof meta>

export const InSeries: Story = {
  args: {
    work: mockWorkInfo[0],
  },
}

export const NotInSeries: Story = {
  args: {
    work: mockWorkInfo[1],
  },
}

export const NoData: Story = {
  args: {
    work: undefined,
  },
}

export default meta
