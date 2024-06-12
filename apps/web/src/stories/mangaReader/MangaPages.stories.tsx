import type { Meta, StoryObj } from '@storybook/react'

import MangaPages from '../../components/MangaReaderPage/MangaPages'
import { mockMangaPages } from '../../../.storybook/fixtures/mangaPages'

const meta: Meta<typeof MangaPages> = {
  title: 'Manga reader/Manga pages',
  component: MangaPages,
}

type Story = StoryObj<typeof meta>

export const OnePageLayout: Story = {
  args: {
    currentPageNumber: 5,
    pages: mockMangaPages,
    showTwoPages: false,
  },
}

export const TwoPageLayout: Story = {
  args: {
    currentPageNumber: 5,
    pages: mockMangaPages,
    showTwoPages: true,
  },
}

export default meta
