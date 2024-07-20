import type { Meta, StoryObj } from '@storybook/react'

import NovelReader from '../../components/NovelReader/NovelReader'
import { mockNovelTextNodes } from '../../../.storybook/fixtures/novelTextNodes'

const meta: Meta<typeof NovelReader> = {
  title: 'Novel reader/Novel reader',
  component: NovelReader,
  parameters: {
    backgrounds: {
      values: [
        { name: 'light', value: 'white' },
        { name: 'dark', value: '#1f1f1f' },
      ],
    },
    layout: 'fullscreen',
  },
}

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    fileDir: '/assets/03b16794-4472-4ac3-b018-537398f83332/',
    initialProgress: 3,
    textNodes: mockNovelTextNodes,
    updateProgress: async (newProgress) => newProgress,
    workId: '03b16794-4472-4ac3-b018-537398f83332',
  },
}

export const MutationError: Story = {
  args: {
    ...Default.args,
    updateProgress: async (newProgress) => {
      throw Error
    },
  },
}

export default meta
