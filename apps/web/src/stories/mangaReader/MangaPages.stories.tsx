import type { Meta, StoryObj } from '@storybook/react'

import MangaPages from '../../components/MangaReaderPage/MangaPages'
import { mockMangaPages } from '../../../.storybook/fixtures/mangaPages'

const meta: Meta<typeof MangaPages> = {
  title: 'Manga reader/Manga pages',
  component: MangaPages,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ height: '100vh', width: '100vw' }}>
        <Story />
      </div>
    ),
  ],
}

type Story = StoryObj<typeof meta>

export const OnePageLayout: Story = {
  args: {
    pages: mockMangaPages.slice(4, 5),
    showTwoPages: false,
  },
}

export const TwoPageLayout: Story = {
  args: {
    pages: mockMangaPages.slice(4, 6),
    showTwoPages: true,
  },
}

export default meta
