import type { Meta, StoryObj } from '@storybook/react'

import ActionButtons from '../../components/VocabTable/ActionButtons'
import { VocabTableType } from '../../components/VocabTable/VocabTable'
import { mockVocab } from '../../../.storybook/fixtures/vocab'
import { Word } from '../../types/Word'

const meta = {
  title: 'Vocab/Action buttons',
  component: ActionButtons,
} satisfies Meta<typeof ActionButtons>

type Story = StoryObj<typeof meta>

const actions = {
  onExcludeWord: () => {},
  onIgnoreWord: () => {},
  onMarkWordAsKnown: () => {},
  onMarkWordAsUnknown: () => {},
  onUnexcludeWord: () => {},
  onUnignoreWord: () => {},
}

export const FrequencyListUnignored: Story = {
  args: {
    ...actions,
    vocabTableType: VocabTableType.SeriesOrWork,
    wordInRow: mockVocab[0] as Word,
  },
}

export const FrequencyListIgnored: Story = {
  args: {
    ...actions,
    vocabTableType: VocabTableType.SeriesOrWork,
    wordInRow: mockVocab[2] as Word,
  },
}

export const RecommendedVocab: Story = {
  args: {
    ...actions,
    vocabTableType: VocabTableType.Recommended,
    wordInRow: mockVocab[0] as Word,
  },
}

export const KnownWords: Story = {
  args: {
    ...actions,
    vocabTableType: VocabTableType.Known,
    wordInRow: mockVocab[0] as Word,
  },
}

export const ExcludedEverywhere: Story = {
  args: {
    ...actions,
    vocabTableType: VocabTableType.Excluded,
    wordInRow: mockVocab[0] as Word,
  },
}

export default meta
