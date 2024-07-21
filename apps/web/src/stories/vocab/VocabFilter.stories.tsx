import { Dispatch, SetStateAction } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { useArgs } from '@storybook/preview-api'

import VocabFilter from '../../components/VocabTable/VocabFilter'
import { VocabTableType } from '../../components/VocabTable/VocabTable'
import { ListType } from '../../components/VocabTable/VocabSort'

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
      const setMinPageNumber = ((value: string) =>
        updateArgs({ minPageNumber: value })) as Dispatch<
        SetStateAction<string | number>
      >
      const setMinVolumeNumber = ((value: string) =>
        updateArgs({ minVolumeNumber: value })) as Dispatch<
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
            setMinPageNumber,
            setMinVolumeNumber,
            setShowIgnored,
            setShowUnignored,
          }}
        />
      )
    },
  ],
}

type Story = StoryObj<typeof meta>

export const SeriesOrWorkFrequency: Story = {
  args: {
    listType: ListType.Frequency,
    minFrequency: 3,
    minPageNumber: 25,
    minVolumeNumber: 5,
    setMinFrequency: () => {},
    setMinPageNumber: () => {},
    setMinVolumeNumber: () => {},
    setShowIgnored: () => {},
    setShowUnignored: () => {},
    showIgnored: false,
    showUnignored: true,
    vocabTableType: VocabTableType.SeriesOrWork,
  },
}

export const WorkGlossary: Story = {
  args: {
    ...SeriesOrWorkFrequency.args,
    listType: ListType.Glossary,
  },
}

export const SeriesGlossary: Story = {
  args: {
    ...WorkGlossary.args,
    isSeries: true,
  },
}

export const RecommendedVocab: Story = {
  args: {
    ...SeriesOrWorkFrequency.args,
    vocabTableType: VocabTableType.Recommended,
  },
}

export default meta
