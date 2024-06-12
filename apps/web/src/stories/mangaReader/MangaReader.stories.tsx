import type { Meta, StoryObj } from '@storybook/react'

import MangaReader from '../../components/MangaReaderPage/MangaReader'
import { mockMangaPages } from '../../../.storybook/fixtures/mangaPages'

const meta: Meta<typeof MangaReader> = {
  title: 'Manga reader/Manga reader',
  component: MangaReader,
}

type Story = StoryObj<typeof meta>

export const Loading: Story = {
  args: {
    loading: true,
  },
}

export const TwoPageLayout: Story = {
  args: {
    initialPageNumber: 1,
    maxPageNumber: 6,
    pages: mockMangaPages,
  },
}

export default meta
