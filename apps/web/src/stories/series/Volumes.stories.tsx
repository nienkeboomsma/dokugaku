import type { Meta, StoryObj } from '@storybook/react'

import Volumes from '../../components/SeriesPage/Volumes'
import { resizer } from '../../../.storybook/decorators/resizer'
import { mockSeriesInfo } from '../../../.storybook/fixtures/seriesInfo'

const meta = {
  title: 'Series/Volumes',
  component: Volumes,
  decorators: [resizer({ padding: '1rem', width: '30rem' })],
} satisfies Meta<typeof Volumes>

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    volumes: mockSeriesInfo.volumes,
  },
}

export default meta
