import type { Meta, StoryObj } from '@storybook/react'

import WordsPage from '../../components/WordsPage/WordsPage'
import { VocabTableType } from '../../components/VocabTable/VocabTable'

const meta = {
  title: 'Vocab/Words page',
  component: WordsPage,
} satisfies Meta<typeof WordsPage>

type Story = StoryObj<typeof meta>

export const KnownWords: Story = {
  args: {
    heading: 'Known words',
    type: VocabTableType.Known,
  },
}

export const ExcludedEverywhere: Story = {
  args: {
    heading: 'Excluded words',
    type: VocabTableType.Excluded,
  },
}

export default meta
