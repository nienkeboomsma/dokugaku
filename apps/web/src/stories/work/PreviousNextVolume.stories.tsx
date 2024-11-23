import type { Meta, StoryObj } from '@storybook/react'

import PreviousNextVolumes from '../../components/Work/PreviousNextVolumes'
import { resizer } from '../../../.storybook/decorators/resizer'

const meta: Meta<typeof PreviousNextVolumes> = {
  title: 'Work/Previous and next volumes',
  component: PreviousNextVolumes,
  decorators: [resizer({ width: '15rem' })],
}

type Story = StoryObj<typeof meta>

export const PreviousOnly: Story = {
  args: {
    currentVolumeNumber: 3,
    volumes: [
      { id: '', volumeNumber: 1 },
      { id: '', volumeNumber: 2 },
      { id: '', volumeNumber: 3 },
    ],
  },
}

export const Both: Story = {
  args: {
    currentVolumeNumber: 2,
    volumes: [
      { id: '', volumeNumber: 1 },
      { id: '', volumeNumber: 2 },
      { id: '', volumeNumber: 3 },
    ],
  },
}

export const NextOnly: Story = {
  args: {
    currentVolumeNumber: 1,
    volumes: [
      { id: '', volumeNumber: 1 },
      { id: '', volumeNumber: 2 },
      { id: '', volumeNumber: 3 },
    ],
  },
}

export const NotSequential: Story = {
  args: {
    currentVolumeNumber: 3,
    volumes: [
      { id: '', volumeNumber: 1 },
      { id: '', volumeNumber: 3 },
      { id: '', volumeNumber: 5 },
    ],
  },
}

export default meta
