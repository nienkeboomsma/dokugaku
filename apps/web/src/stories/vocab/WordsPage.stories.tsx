import type { Meta, StoryObj } from '@storybook/react'

import WordsPage from '../../components/WordsPage/WordsPage'
import { ApolloMockedProvider } from '../../../.storybook/decorators/mocks'
import { knownWords } from '../../../.storybook/mocks/knownWords'
import { excludedWords } from '../../../.storybook/mocks/excludedWords'
import { updateExcludedStatus } from '../../../.storybook/mocks/updateExcludedStatus'
import { updateKnownStatus } from '../../../.storybook/mocks/updateKnownStatus'
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
  decorators: [
    ApolloMockedProvider([knownWords, updateExcludedStatus, updateKnownStatus]),
  ],
}

export const ExcludedEverywhere: Story = {
  args: {
    heading: 'Excluded words',
    type: VocabTableType.Excluded,
  },
  decorators: [
    ApolloMockedProvider([
      excludedWords,
      updateExcludedStatus,
      updateKnownStatus,
    ]),
  ],
}

export default meta
