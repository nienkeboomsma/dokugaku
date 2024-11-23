import type { Meta, StoryObj } from '@storybook/react'

import Volumes from '../../components/Series/Volumes'
import { resizer } from '../../../.storybook/decorators/resizer'
import { mockSeriesInfo } from '../../../.storybook/fixtures/seriesInfo'

const meta = {
  title: 'Series/Volumes',
  component: Volumes,
  decorators: [resizer({ padding: '1rem', width: '40rem' })],
} satisfies Meta<typeof Volumes>

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    volumes: mockSeriesInfo.volumes,
  },
}

export const NoReading: Story = {
  args: {
    volumes: mockSeriesInfo.volumes
      .slice(0, 3)
      .concat(mockSeriesInfo.volumes.slice(4)),
  },
}

export const NoReadingOrWantToRead: Story = {
  args: {
    volumes: mockSeriesInfo.volumes
      .slice(0, 3)
      .concat(mockSeriesInfo.volumes.slice(6)),
  },
}

export default meta
