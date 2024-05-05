import type { Meta, StoryObj } from '@storybook/react'

import AuthorList from '../../components/AuthorList'
import { resizer } from '../../../.storybook/decorators/resizer'

const meta = {
  title: 'Work/Author list',
  component: AuthorList,
} satisfies Meta<typeof AuthorList>

type Story = StoryObj<typeof meta>

export const Single: Story = {
  args: {
    authors: ['高瀬 隼子'],
  },
  decorators: [resizer({ width: '7ch' })],
}

export const Array: Story = {
  args: {
    authors: ['オオイシ ナホ', '鳥山 明'],
  },
  decorators: [resizer({ width: '17ch' })],
}

export default meta
