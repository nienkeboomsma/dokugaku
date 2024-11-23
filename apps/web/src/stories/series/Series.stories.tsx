import type { Meta, StoryObj } from '@storybook/react'

import Series from '../../components/Series/Series'
import { ApolloMockedProvider } from '../../../.storybook/decorators/mocks'
import { frequencyList } from '../../../.storybook/mocks/frequencyList'
import { glossary } from '../../../.storybook/mocks/glossary'
import { updateExcludedStatus } from '../../../.storybook/mocks/updateExcludedStatus'
import { updateIgnoredStatus } from '../../../.storybook/mocks/updateIgnoredStatus'
import { updateKnownStatus } from '../../../.storybook/mocks/updateKnownStatus'
import { updateSeriesReadStatus } from '../../../.storybook/mocks/updateSeriesReadStatus'
import { mockSeriesInfo } from '../../../.storybook/fixtures/seriesInfo'

const meta = {
  title: 'Series/Page',
  component: Series,
  decorators: [
    ApolloMockedProvider([
      frequencyList,
      glossary,
      updateExcludedStatus,
      updateIgnoredStatus,
      updateKnownStatus,
      updateSeriesReadStatus,
    ]),
  ],
} satisfies Meta<typeof Series>

type Story = StoryObj<typeof meta>

export const FewVolumes: Story = {
  args: {
    data: {
      ...mockSeriesInfo,
      volumes: mockSeriesInfo.volumes.slice(0, 3),
    },
    loading: false,
  },
}

export const ManyVolumes: Story = {
  args: {
    data: mockSeriesInfo,
    loading: false,
  },
}

export const NoData: Story = {
  args: {
    loading: true,
  },
}

export default meta
