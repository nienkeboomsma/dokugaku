import type { Meta, StoryObj } from '@storybook/react'
import { useState } from '@storybook/preview-api'

import Pagination from '../../components/MangaReader/Pagination'
import { getShowTwoPages } from '../../util/getPageNumber'

const meta: Meta<typeof Pagination> = {
  title: 'Manga reader/Pagination',
  component: Pagination,
  decorators: [
    (Story, context) => {
      const [currentPageNumber, setCurrentPageNumber] = useState(
        context.args.currentPageNumber
      )

      return (
        <Story
          args={{ ...context.args, currentPageNumber, setCurrentPageNumber }}
        />
      )
    },
  ],
}

type Story = StoryObj<typeof meta>

export const OnePage: Story = {
  args: {
    currentPageNumber: 3,
    maxPageNumber: 6,
    showTwoPages: false,
    twoPageLayout: false,
  },
}

export const TwoPages: Story = {
  args: {
    currentPageNumber: 3,
    maxPageNumber: 6,
    twoPageLayout: true,
  },
  decorators: [
    (Story, context) => (
      <Story
        args={{
          ...context.args,
          showTwoPages: getShowTwoPages(
            context.args.currentPageNumber,
            context.args.maxPageNumber,
            context.args.twoPageLayout
          ),
        }}
      />
    ),
  ],
}

export default meta
