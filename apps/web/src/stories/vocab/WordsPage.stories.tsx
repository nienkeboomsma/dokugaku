import type { Meta, StoryObj } from '@storybook/react'

import WordsPage from '../../components/WordsPage/WordsPage'
import { mockVocab } from '../../fixtures/vocab'

const meta = {
  title: 'Vocab/Words page',
  component: WordsPage,
} satisfies Meta<typeof WordsPage>

type Story = StoryObj<typeof meta>

export const KnownWords: Story = {
  args: {
    heading: 'Known words',
    initialVocab: mockVocab,
    type: 'knownWords',
  },
}

export const ExcludedEverywhere: Story = {
  args: {
    heading: 'Excluded words',
    initialVocab: mockVocab,
    type: 'excludedEverywhere',
  },
}

export default meta
