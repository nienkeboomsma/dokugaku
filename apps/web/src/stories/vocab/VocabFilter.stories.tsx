import type { Meta, StoryObj } from '@storybook/react'
import { useArgs } from '@storybook/preview-api'
import { Dispatch, SetStateAction } from 'react'

import VocabFilter from '../../components/VocabTable/VocabFilter'

const meta = {
  title: 'Vocab/Vocab filter',
  component: VocabFilter,
} satisfies Meta<typeof VocabFilter>

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    minFrequency: 2,
    setMinFrequency: () => {},
  },
  decorators: [
    (Story, context) => {
      const [, updateArgs] = useArgs()
      const setMinFrequency = ((value: string) =>
        updateArgs({ minFrequency: value })) as Dispatch<
        SetStateAction<string | number>
      >

      return <Story args={{ ...context.args, setMinFrequency }} />
    },
  ],
}

export default meta
