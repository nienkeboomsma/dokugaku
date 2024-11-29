import type { Meta, StoryObj } from '@storybook/react'

import VocabFilter from '../../../components/VocabTable/VocabFilter/VocabFilter'
import { VocabTableType } from '../../../components/VocabTable/VocabTable'
import { ListType } from '../../../components/VocabTable/VocabFilter/VocabSort'
import { mockSeriesInfo } from '../../../../.storybook/fixtures/seriesInfo'
import { mockWorkInfo } from '../../../../.storybook/fixtures/workInfo'
import { WorkInfo } from '../../../types/WorkInfo'
import useVocabTableFilters from '../../../hooks/useVocabTableFilters'

// avoiding 'satisfies' fixes TS error with decorators (Storybook issue #24656)
const meta: Meta<typeof VocabFilter> = {
  title: 'Vocab/Filter/Vocab filter',
  component: VocabFilter,
  decorators: [
    (Story, context) => {
      const {
        minimumValues,
        showIgnoredOptions,
        showJlptOptions,
        setMinimumValues,
        setShowJlptOptions,
        setShowIgnoredOptions,
      } = useVocabTableFilters({
        furigana: true,
        type: context.args.vocabTableType,
        seriesOrWork:
          context.args.vocabTableType === VocabTableType.SeriesOrWork &&
          context.args.isSeries
            ? mockSeriesInfo
            : (mockWorkInfo[0] as WorkInfo),
      })

      return (
        <Story
          args={{
            ...context.args,
            minimumValues,
            showIgnoredOptions,
            showJlptOptions,
            setMinimumValues,
            setShowJlptOptions,
            setShowIgnoredOptions,
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
    vocabTableType: VocabTableType.SeriesOrWork,
  },
}

export const WorkGlossary: Story = {
  args: {
    ...SeriesOrWorkFrequency.args,
    isSeries: false,
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
    vocabTableType: VocabTableType.Recommended,
  },
}

export const KnownOrExcludedVocab: Story = {
  args: {
    vocabTableType: VocabTableType.Known,
  },
}

export default meta
