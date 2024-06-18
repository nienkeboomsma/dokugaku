import type { Meta, StoryObj } from '@storybook/react'

import NovelReader from '../../components/NovelReader/NovelReader'
import { mockNovelTextNodes } from '../../../.storybook/fixtures/novelTextNodes'

const meta: Meta<typeof NovelReader> = {
  title: 'Novel reader/Novel reader',
  component: NovelReader,
  parameters: {
    layout: 'fullscreen',
  },
}

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    initialProgress: 3,
    textNodes: mockNovelTextNodes,
    updateProgress: async (newProgress) => newProgress,
    workId: 'xyz',
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
