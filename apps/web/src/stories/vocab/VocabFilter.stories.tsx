import { Dispatch, SetStateAction } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { useArgs } from '@storybook/preview-api'

import VocabFilter from '../../components/VocabTable/VocabFilter'
import { VocabTableType } from '../../components/VocabTable/VocabTable'

// avoiding 'satisfies' fixes TS error with decorators (Storybook issue #24656)
const meta: Meta<typeof VocabFilter> = {
  title: 'Vocab/Vocab filter',
  component: VocabFilter,
  decorators: [
    (Story, context) => {
      const [, updateArgs] = useArgs()
      const setMinFrequency = ((value: string) =>
        updateArgs({ minFrequency: value })) as Dispatch<
        SetStateAction<string | number>
      >
      const setShowIgnored = ((value: boolean) =>
        updateArgs({ showIgnored: value })) as Dispatch<SetStateAction<boolean>>
      const setShowUnignored = ((value: boolean) =>
        updateArgs({ showUnignored: value })) as Dispatch<
        SetStateAction<boolean>
      >

      return (
        <Story
          args={{
            ...context.args,
            setMinFrequency,
            setShowIgnored,
            setShowUnignored,
          }}
        />
      )
    },
  ],
}

type Story = StoryObj<typeof meta>

export const SeriesOrWork: Story = {
  args: {
    minFrequency: 3,
    setMinFrequency: () => {},
    setShowIgnored: () => {},
    setShowUnignored: () => {},
    showIgnored: false,
    showUnignored: true,
    vocabTableType: VocabTableType.SeriesOrWork,
  },
}

export const RecommendedVocab: Story = {
  args: {
    ...SeriesOrWork.args,
    vocabTableType: VocabTableType.Recommended,
  },
}

export default meta
