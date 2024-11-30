import type { Meta, StoryObj } from '@storybook/react'
import { useArgs } from '@storybook/preview-api'

import Bookmark from '../../components/NovelReader/Bookmark'
import { ApolloMockedProvider } from '../../../.storybook/decorators/mocks'
import { updateWorkProgress } from '../../../.storybook/mocks/updateWorkProgress'
import { rtl } from '../../../.storybook/decorators/rtl'

const meta: Meta<typeof Bookmark> = {
  title: 'Novel reader/Bookmark',
  component: Bookmark,
  parameters: {
    backgrounds: {
      values: [
        { name: 'light', value: 'white' },
        { name: 'dark', value: '#1f1f1f' },
      ],
    },
  },
  decorators: [
    ApolloMockedProvider([updateWorkProgress]),
    rtl,
    (Story, context) => {
      const [, updateArgs] = useArgs()
      const clickHandler = () => {
        updateArgs({ isCurrentProgress: !context.args.isCurrentProgress })
      }

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
              updateProgress: clickHandler,
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
    isCurrentProgress: false,
    paragraphNumber: 123,
  },
}

export default meta
