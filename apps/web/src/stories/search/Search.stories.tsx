import { Dispatch, SetStateAction } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { useArgs } from '@storybook/preview-api'

import Search from '../../components/SearchFilterSort/Search'

const meta = {
  title: 'Search/Search',
  component: Search,
} satisfies Meta<typeof Search>

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    searchValue: '',
    setSearchValue: () => {},
  },
  decorators: [
    (Story, context) => {
      const [, updateArgs] = useArgs()
      const setSearchValue = ((value: string) =>
        updateArgs({ searchValue: value })) as Dispatch<SetStateAction<string>>

      return <Story args={{ ...context.args, setSearchValue }} />
    },
  ],
}

export default meta
