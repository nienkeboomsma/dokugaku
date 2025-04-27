import type { Meta, StoryObj } from '@storybook/react'
import { useArgs } from '@storybook/preview-api'

import Bookmark from '../components/Bookmark'

const meta: Meta<typeof Bookmark> = {
  title: 'Bookmark',
  component: Bookmark,

  decorators: [
    (Story, context) => {
      const [, updateArgs] = useArgs()

      return (
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            fontSize: '1rem',
            justifyContent: 'center',
            height: '200px',
            width: '200px',
          }}
        >
          <Story
            args={{
              ...context.args,
              saveBookmark: () => {
                updateArgs({ isSavedBookmark: !context.args.isSavedBookmark })
              },
            }}
          />
        </div>
      )
    },
  ],
}

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export default meta
