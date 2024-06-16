import type { Meta, StoryObj } from '@storybook/react'

import NovelReaderMenu from '../../components/NovelReader/NovelReaderMenu'
import { rtl } from '../../../.storybook/decorators/rtl'
import useNovelReaderDirection from '../../hooks/useNovelReaderDirection'

const meta: Meta<typeof NovelReaderMenu> = {
  title: 'Novel reader/Menu',
  component: NovelReaderMenu,
  decorators: [
    rtl,
    (Story, context) => {
      const { direction, toggleDirection } = useNovelReaderDirection('vertical')

      return (
        <Story
          args={{
            ...context.args,
            direction,
            toggleDirection,
          }}
        />
      )
    },
  ],
}

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    maxProgress: 345,
    progress: 20,
    workId: 'abc',
  },
}

export default meta
