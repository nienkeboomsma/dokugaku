import type { Meta, StoryObj } from '@storybook/react'

import SeriesPage from '../../components/SeriesPage/SeriesPage'
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
  component: SeriesPage,
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
} satisfies Meta<typeof SeriesPage>

type Story = StoryObj<typeof meta>

export const FewVolumes: Story = {
  args: {
    series: {
      ...mockSeriesInfo,
      volumes: mockSeriesInfo.volumes.slice(0, 3),
    },
  },
}

export const ManyVolumes: Story = {
  args: {
    series: mockSeriesInfo,
  },
}

export const NoData: Story = {
  args: {
    series: undefined,
  },
}

export default meta
