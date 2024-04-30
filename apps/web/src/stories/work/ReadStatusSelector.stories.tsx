import type { Meta, StoryObj } from '@storybook/react'
import { useArgs } from '@storybook/preview-api'

import ReadStatusSelector from '../../components/ReadStatusSelector'
import { GQL_ReadStatus } from '@repo/graphql-types'

const meta: Meta<typeof ReadStatusSelector> = {
  title: 'Work/Read status selector',
  component: ReadStatusSelector,
  decorators: [
    (Story, context) => {
      const [, updateArgs] = useArgs()
      const updateStatus = (status: string) => updateArgs({ status })

      return <Story args={{ ...context.args, updateStatus }} />
    },
  ],
}

type Story = StoryObj<typeof meta>

export const Abandoned: Story = {
  args: {
    loading: false,
    status: GQL_ReadStatus.Abandoned,
  },
}

export const Loading: Story = {
  args: {
    loading: true,
    status: GQL_ReadStatus.Abandoned,
  },
}

export const New: Story = {
  args: {
    loading: false,
    status: GQL_ReadStatus.New,
  },
}

export const Read: Story = {
  args: {
    loading: false,
    status: GQL_ReadStatus.Read,
  },
}

export const Reading: Story = {
  args: {
    loading: false,
    status: GQL_ReadStatus.Reading,
  },
}

export const WantToRead: Story = {
  args: {
    loading: false,
    status: GQL_ReadStatus.WantToRead,
  },
}

export default meta
