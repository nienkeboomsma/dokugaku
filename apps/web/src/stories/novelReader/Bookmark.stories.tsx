import type { Meta, StoryObj } from '@storybook/react'

import Bookmark from '../../components/NovelReaderPage/Bookmark'
import useBookmarkProgress from '../../hooks/useBookmarkProgress'

const meta: Meta<typeof Bookmark> = {
  title: 'Novel reader/Bookmark',
  component: Bookmark,
  decorators: [
    (Story, context) => {
      const { progress, createUpdateProgress } = useBookmarkProgress(3)

      return (
        <div style={{ direction: 'rtl' }}>
          <Story
            args={{
              ...context.args,
              progress,
              updateProgress: createUpdateProgress('abc'),
            }}
          />
        </div>
      )
    },
  ],
}

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    paragraphNumber: 123,
  },
}

export default meta
