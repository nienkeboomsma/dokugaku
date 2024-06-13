import type { Meta, StoryObj } from '@storybook/react'

import MangaReader from '../../components/MangaReaderPage/MangaReader'
import { mockMangaPages } from '../../../.storybook/fixtures/mangaPages'

const meta: Meta<typeof MangaReader> = {
  title: 'Manga reader/Manga reader',
  component: MangaReader,
}

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    getPageData: async (pageNumbers) =>
      pageNumbers.map((pageNumber) =>
        mockMangaPages.find((page) => page.pageNumber === pageNumber)
      ),
    initialPageNumber: 1,
    initialPages: mockMangaPages.slice(0, 2),
    maxPageNumber: mockMangaPages.length,
    updateProgress: async (newProgress) => newProgress,
  },
}

export const MutationError: Story = {
  args: {
    ...Default.args,
    updateProgress: async (newProgress) => {
      throw Error
    },
  },
}

export default meta
