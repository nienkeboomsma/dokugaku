import type { Meta, StoryObj } from '@storybook/react'

import SeriesSkeleton from '../../components/Series/SeriesSkeleton'
import { ApolloMockedProvider } from '../../../.storybook/decorators/mocks'
import { frequencyList } from '../../../.storybook/mocks/frequencyList'
import { glossary } from '../../../.storybook/mocks/glossary'
import { updateExcludedStatus } from '../../../.storybook/mocks/updateExcludedStatus'
import { updateIgnoredStatus } from '../../../.storybook/mocks/updateIgnoredStatus'
import { updateKnownStatus } from '../../../.storybook/mocks/updateKnownStatus'
import { updateSeriesReadStatus } from '../../../.storybook/mocks/updateSeriesReadStatus'

const meta = {
  title: 'Series/Page skeleton',
  component: SeriesSkeleton,
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
} satisfies Meta<typeof SeriesSkeleton>

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export default meta
