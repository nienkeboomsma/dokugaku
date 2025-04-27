import type { Meta, StoryObj } from '@storybook/react'
import { useArgs, useState } from '@storybook/preview-api'

import NovelBookmark from '../../components/NovelReader/NovelBookmark'
import { rtl } from '../../../.storybook/decorators/rtl'

const meta: Meta<typeof NovelBookmark> = {
  title: 'Novel reader/Novel bookmark',
  component: NovelBookmark,
  parameters: {
    backgrounds: {
      values: [
        { name: 'light', value: 'white' },
        { name: 'dark', value: '#1f1f1f' },
      ],
    },
  },
  decorators: [
    rtl,
    (Story, context) => {
      const [isSavedBookmark, setIsSavedBookmark] = useState(false)

      return (
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            fontSize: '1.5rem',
            justifyContent: 'center',
            height: '200px',
            width: '200px',
          }}
        >
          <Story
            args={{
              ...context.args,
              isSavedBookmark: isSavedBookmark,
              saveBookmark: () => setIsSavedBookmark(!isSavedBookmark),
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
    paragraphNumber: 3456,
  },
}

export default meta
