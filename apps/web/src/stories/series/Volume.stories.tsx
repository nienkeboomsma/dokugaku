import type { Meta, StoryObj } from '@storybook/react'

import Volume, { VolumeMinWidth } from '../../components/SeriesPage/Volume'
import { resizer } from '../../../.storybook/decorators/resizer'
import { mockSeriesInfo } from '../../../.storybook/fixtures/seriesInfo'
import { type VolumeInfo } from '../../types/SeriesInfo'

const indicatorSize = '1.5rem'

const meta = {
  title: 'Series/Volume',
  component: Volume,
  decorators: [
    resizer({
      contentMinWidth: VolumeMinWidth,
      contentWidth: `calc(${VolumeMinWidth} + 3rem`,
      padding: indicatorSize,
    }),
  ],
} satisfies Meta<typeof Volume>

type Story = StoryObj<typeof meta>

export const WantToRead: Story = {
  args: {
    indicatorSize,
    volume: mockSeriesInfo.volumes[4] as VolumeInfo,
  },
}

export const Reading: Story = {
  args: {
    indicatorSize,
    volume: mockSeriesInfo.volumes[3] as VolumeInfo,
  },
}

export const Read: Story = {
  args: {
    indicatorSize,
    volume: mockSeriesInfo.volumes[2] as VolumeInfo,
  },
}

export default meta
