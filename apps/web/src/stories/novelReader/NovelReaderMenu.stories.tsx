import type { Meta, StoryObj } from '@storybook/react'

import NovelReaderMenu from '../../components/NovelReaderPage/NovelReaderMenu'
import useNovelReaderDirection from '../../hooks/useNovelReaderDirection'

const meta: Meta<typeof NovelReaderMenu> = {
  title: 'Novel reader/Menu',
  component: NovelReaderMenu,
  decorators: [
    (Story, context) => {
      const { direction, toggleDirection } = useNovelReaderDirection('vertical')

      return (
        <div style={{ direction: 'rtl' }}>
          <Story
            args={{
              ...context.args,
              direction,
              toggleDirection,
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
    workId: 'abc',
  },
}

export default meta
