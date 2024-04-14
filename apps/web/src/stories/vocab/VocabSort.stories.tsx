import type { Meta, StoryObj } from '@storybook/react'
import { useArgs } from '@storybook/preview-api'
import { Dispatch, SetStateAction } from 'react'

import VocabSort from '../../components/VocabTable/VocabSort'

const meta = {
  title: 'Vocab/Vocab sort',
  component: VocabSort,
} satisfies Meta<typeof VocabSort>

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    sortOrder: 'frequency',
    setSortOrder: () => {},
  },
  decorators: [
    (Story, context) => {
      const [, updateArgs] = useArgs()
      const setSortOrder = ((value: string) =>
        updateArgs({ sortOrder: value })) as Dispatch<
        SetStateAction<typeof context.args.sortOrder>
      >

      return <Story args={{ ...context.args, setSortOrder }} />
    },
  ],
}

export default meta
