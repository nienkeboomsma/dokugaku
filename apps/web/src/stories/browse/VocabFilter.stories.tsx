import { Dispatch, SetStateAction } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { useArgs } from '@storybook/preview-api'

import WorkCardFilter from '../../components/BrowsePage/WorkCardFilter'

const meta = {
  title: 'Browse/Work card filter',
  component: WorkCardFilter,
} satisfies Meta<typeof WorkCardFilter>

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    showAbandoned: true,
    setShowAbandoned: () => {},
    showFinished: false,
    setShowFinished: () => {},
  },
  decorators: [
    (Story, context) => {
      const [, updateArgs] = useArgs()
      const setShowAbandoned = ((value) =>
        updateArgs({ showAbandoned: value })) as Dispatch<
        SetStateAction<boolean>
      >
      const setShowFinished = ((value) =>
        updateArgs({ showFinished: value })) as Dispatch<
        SetStateAction<boolean>
      >

      return (
        <Story args={{ ...context.args, setShowAbandoned, setShowFinished }} />
      )
    },
  ],
}

export default meta
