import type { Meta, StoryObj } from '@storybook/react'

import MangaReader from '../../components/MangaReader/MangaReader'
import { mockMangaPages } from '../../../.storybook/fixtures/mangaPages'
import { useEffect, useRef } from 'react'

const meta: Meta<typeof MangaReader> = {
  title: 'Manga reader/Manga reader',
  component: MangaReader,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => {
      const divRef = useRef<HTMLDivElement>(null)

      useEffect(() => {
        if (!divRef.current) return
        divRef.current.focus()
      }, [])

      return (
        <div
          ref={divRef}
          style={{
            height: '100%',
            outline: 'none',
            width: '100%',
          }}
          tabIndex={-1}
        >
          <Story />
        </div>
      )
    },
  ],
}

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    getPageData: async (pageNumbers) =>
      pageNumbers.map((pageNumber) =>
        mockMangaPages.find((page) => page.pageNumber === pageNumber)
      ),
    initialPageNumber: 1,
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
