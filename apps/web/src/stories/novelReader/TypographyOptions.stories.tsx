import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import TypographyOptions from '../../components/NovelReader/TypographyOptions'

const meta = {
  title: 'Novel reader/Typography options',
  component: TypographyOptions,
} satisfies Meta<typeof TypographyOptions>

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    fontSizeMultiplier: 1,
    lineHeightMultiplier: 1,
    setFontSizeMultiplier: () => {},
    setLineHeightMultiplier: () => {},
  },
  decorators: [
    (Story, context) => {
      const [fontSizeMultiplier, setFontSizeMultiplier] = useState(
        context.args.fontSizeMultiplier
      )
      const [lineHeightMultiplier, setLineHeightMultiplier] = useState(
        context.args.lineHeightMultiplier
      )

      return (
        <Story
          args={{
            fontSizeMultiplier,
            lineHeightMultiplier,
            setFontSizeMultiplier,
            setLineHeightMultiplier,
          }}
        />
      )
    },
  ],
}

export default meta
