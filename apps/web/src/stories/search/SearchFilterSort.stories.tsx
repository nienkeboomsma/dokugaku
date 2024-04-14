import type { Meta, StoryObj } from '@storybook/react'
import { useArgs } from '@storybook/preview-api'
import { Dispatch, SetStateAction } from 'react'

import SearchFilterSort from '../../components/SearchFilterSort/SearchFilterSort'

// avoiding 'satisfies' fixes TS error with decorators (Storybook issue #24656)
const meta: Meta<typeof SearchFilterSort> = {
  title: 'Search/Search with options',
  component: SearchFilterSort,
  decorators: [
    (Story, context) => {
      const [, updateArgs] = useArgs()
      const setSearchValue = ((value: string) =>
        updateArgs({ searchValue: value })) as Dispatch<SetStateAction<string>>

      return <Story args={{ ...context.args, setSearchValue }} />
    },
  ],
}

type Story = StoryObj<typeof meta>

export const OnlySort: Story = {
  args: {
    searchValue: '',
    setSearchValue: () => {},
    sortContent: 'Some sort options',
  },
}

export const FilterAndSort: Story = {
  args: {
    filterContent: 'Some filter options',
    searchValue: '',
    setSearchValue: () => {},
    sortContent: 'Some sort options',
  },
}

export default meta
