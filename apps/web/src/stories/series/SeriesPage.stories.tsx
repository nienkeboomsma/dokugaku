import type { Meta, StoryObj } from '@storybook/react'

import SeriesPage from '../../components/SeriesPage/SeriesPage'
import { mockSeriesInfo } from '../../fixtures/seriesInfo'
import { mockVocab } from '../../fixtures/vocab'

const meta = {
  title: 'Series/Page',
  component: SeriesPage,
} satisfies Meta<typeof SeriesPage>

type Story = StoryObj<typeof meta>

export const FewVolumes: Story = {
  args: {
    series: {
      ...mockSeriesInfo,
      volumes: mockSeriesInfo.volumes.slice(0, 3),
    },
    initialVocab: mockVocab,
  },
}

export const ManyVolumes: Story = {
  args: {
    series: mockSeriesInfo,
    initialVocab: mockVocab,
  },
}

export default meta
