import type { Meta, StoryObj } from '@storybook/react'

import MangaPage from '../../components/MangaReaderPage/MangaPage'
import { mockMangaPages } from '../../../.storybook/fixtures/mangaPages'

const meta: Meta<typeof MangaPage> = {
  title: 'Manga reader/Manga page',
  component: MangaPage,
}

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    page: mockMangaPages[5],
  },
}

export default meta
