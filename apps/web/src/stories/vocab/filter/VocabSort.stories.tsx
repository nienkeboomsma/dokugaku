import { Dispatch, SetStateAction } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { useArgs } from '@storybook/preview-api'

import VocabSort, {
  ListType,
} from '../../../components/VocabTable/VocabFilter/VocabSort'

const meta = {
  title: 'Vocab/Filter/Vocab sort',
  component: VocabSort,
} satisfies Meta<typeof VocabSort>

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    listType: ListType.Frequency,
    setListType: () => {},
  },
  decorators: [
    (Story, context) => {
      const [, updateArgs] = useArgs()
      const setListType = ((value: string) =>
        updateArgs({ listType: value })) as Dispatch<
        SetStateAction<typeof context.args.listType>
      >

      return <Story args={{ ...context.args, setListType }} />
    },
  ],
}

export default meta
