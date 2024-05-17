import type { Meta, StoryObj } from '@storybook/react'

import NovelReaderPage from '../../components/NovelReaderPage/NovelReaderPage'
import { mockNovelTextNodes } from '../../../.storybook/fixtures/novelTextNodes'

const meta: Meta<typeof NovelReaderPage> = {
  title: 'Novel reader/Page',
  component: NovelReaderPage,
  decorators: [
    (Story) => (
      <div style={{ direction: 'rtl' }}>
        <Story />
      </div>
    ),
  ],
}

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    initialProgress: 3,
    textNodes: mockNovelTextNodes,
    workId: 'xyz',
  },
}

export default meta
