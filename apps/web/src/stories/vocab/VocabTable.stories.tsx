import type { Meta, StoryObj } from '@storybook/react'

import VocabTable from '../../components/VocabTable/VocabTable'
import { mockVocab } from '../../fixtures/vocab'
import { useVocab } from '../../hooks/useVocab'

// avoiding 'satisfies' fixes TS error with decorators (Storybook issue #24656)
const meta: Meta<typeof VocabTable> = {
  title: 'Vocab/Vocab table',
  component: VocabTable,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story, context) => {
      const { vocab, actions } = useVocab(context.args.vocab, {
        isSeries: true,
        seriesOrWorkId: 'someId',
      })
      return <Story args={{ ...context.args, actions, vocab }} />
    },
  ],
}

type Story = StoryObj<typeof meta>

export const WithFurigana: Story = {
  args: {
    furigana: true,
    type: 'frequencyList',
    vocab: mockVocab,
  },
}

export const WithoutFurigana: Story = {
  args: {
    type: 'frequencyList',
    vocab: mockVocab,
  },
}
export const KnownVocab: Story = {
  args: {
    type: 'knownWords',
    vocab: mockVocab,
  },
}

export const ExcludedEverywhere: Story = {
  args: {
    type: 'excludedEverywhere',
    vocab: mockVocab,
  },
}

export const NoRecords: Story = {
  args: {
    type: 'frequencyList',
    vocab: [],
  },
}

export default meta
