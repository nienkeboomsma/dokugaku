import type { Meta, StoryObj } from '@storybook/react'
import { useState } from '@storybook/preview-api'

import Settings from '../../components/MangaReader/Settings'
import { getShowTwoPages } from '../../util/getPageNumber'
import useFullscreen from '../../hooks/useFullscreen'

const meta: Meta<typeof Settings> = {
  title: 'Manga reader/Settings',
  component: Settings,
  decorators: [
    (Story, context) => {
      const [twoPageLayout, setTwoPageLayout] = useState(false)
      const { fullscreen, toggleFullscreen } = useFullscreen()

      return (
        <Story
          args={{
            fullscreen,
            setTwoPageLayout,
            toggleFullscreen,
            twoPageLayout,
          }}
        />
      )
    },
  ],
}

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export default meta
