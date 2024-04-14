import type { Meta, StoryObj } from '@storybook/react'
import { useArgs } from '@storybook/preview-api'

import ReadStatusSelector from '../../components/ReadStatusSelector'

const meta: Meta<typeof ReadStatusSelector> = {
  title: 'Work/Read status selector',
  component: ReadStatusSelector,
  decorators: [
    (Story, context) => {
      const [, updateArgs] = useArgs()
      const setValue = (value: string) => updateArgs({ value })

      return <Story args={{ ...context.args, setValue }} />
    },
  ],
}

type Story = StoryObj<typeof meta>

export const WantToRead: Story = {
  args: {
    value: 'want to read',
  },
}

export const Reading: Story = {
  args: {
    value: 'reading',
  },
}

export const Read: Story = {
  args: {
    value: 'read',
  },
}

export const Abandoned: Story = {
  args: {
    value: 'abandoned',
  },
}

export default meta
