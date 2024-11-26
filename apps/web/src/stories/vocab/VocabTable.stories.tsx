import type { Meta, StoryObj } from '@storybook/react'

import VocabTable, {
  VocabTableType,
} from '../../components/VocabTable/VocabTable'
import { ApolloMockedProvider } from '../../../.storybook/decorators/mocks'
import { excludedWords } from '../../../.storybook/mocks/excludedWords'
import { frequencyList } from '../../../.storybook/mocks/frequencyList'
import { glossary } from '../../../.storybook/mocks/glossary'
import { knownWords } from '../../../.storybook/mocks/knownWords'
import { updateExcludedStatus } from '../../../.storybook/mocks/updateExcludedStatus'
import { updateIgnoredStatus } from '../../../.storybook/mocks/updateIgnoredStatus'
import { updateKnownStatus } from '../../../.storybook/mocks/updateKnownStatus'
import { type WorkInfo } from '../../types/WorkInfo'
import { mockWorkInfo } from '../../../.storybook/fixtures/workInfo'
import { mockSeriesInfo } from '../../../.storybook/fixtures/seriesInfo'

// avoiding 'satisfies' fixes TS error with decorators (Storybook issue #24656)
const meta = {
  title: 'Vocab/Vocab table',
  component: VocabTable,
  decorators: [
    ApolloMockedProvider([
      excludedWords,
      frequencyList,
      glossary,
      knownWords,
      updateExcludedStatus,
      updateIgnoredStatus,
      updateKnownStatus,
    ]),
  ],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof VocabTable>

type Story = StoryObj<typeof meta>

export const WithFurigana: Story = {
  args: {
    furigana: true,
    seriesOrWork: mockWorkInfo[0] as WorkInfo,
    type: VocabTableType.SeriesOrWork,
  },
}

export const WithoutFurigana: Story = {
  args: {
    furigana: false,
    seriesOrWork: mockSeriesInfo,
    type: VocabTableType.SeriesOrWork,
  },
}
export const KnownVocab: Story = {
  args: {
    furigana: false,
    type: VocabTableType.Known,
  },
}

export const ExcludedEverywhere: Story = {
  args: {
    furigana: false,
    type: VocabTableType.Excluded,
  },
}

export default meta
