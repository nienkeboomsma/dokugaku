import type { Meta, StoryObj } from '@storybook/react'

import ActionButtons from '../../components/VocabTable/ActionButtons'

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

export const FrequencyList: Story = {
  args: {
    ...actions,
    type: 'frequencyList',
  },
}

export const RecommendedVocab: Story = {
  args: {
    ...actions,
    type: 'recommendedVocab',
  },
}

export const KnownWords: Story = {
  args: {
    ...actions,
    type: 'knownWords',
  },
}

export const ExcludedFromWork: Story = {
  args: {
    ...actions,
    type: 'excludedFromWork',
  },
}

export const ExcludedEverywhere: Story = {
  args: {
    ...actions,
    type: 'excludedEverywhere',
  },
}

export default meta
