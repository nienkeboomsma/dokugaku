import type { Meta, StoryObj } from '@storybook/react'

import WorkCover from '../../components/WorkCover'
import { resizer } from '../../../.storybook/decorators/resizer'

const meta = {
  title: 'Work/Work cover',
  component: WorkCover,
} satisfies Meta<typeof WorkCover>

type Story = StoryObj<typeof meta>

export const NoProgress: Story = {
  args: {
    coverPath: '/assets/90bfe324-e5f0-48fe-a7ca-621b14739b78/cover.webp',
    grow: false,
    width: '12rem',
  },
}

export const WithProgress: Story = {
  args: {
    coverPath: '/assets/a1f5e015-415a-4031-9c62-1674e1221c88/cover.webp',
    grow: false,
    maxProgress: 100,
    progress: 30,
    width: '12rem',
  },
}

export const WithGrow: Story = {
  args: {
    coverPath: '/assets/ffaf662c-81c0-46dd-839a-ed88fbd41fb7/cover.webp',
    grow: true,
  },
  decorators: [resizer()],
}

export default meta
