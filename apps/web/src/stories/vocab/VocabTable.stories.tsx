import type { Meta, StoryObj } from '@storybook/react'

import VocabTable, {
  VocabTableType,
} from '../../components/VocabTable/VocabTable'
import { mockWorkInfo } from '../../fixtures/workInfo'
import { mockSeriesInfo } from '../../fixtures/seriesInfo'

// avoiding 'satisfies' fixes TS error with decorators (Storybook issue #24656)
const meta = {
  title: 'Vocab/Vocab table',
  component: VocabTable,
  parameters: {
    layout: 'fullscreen',
  },
  // TODO: mock data successful and unsuccessful fetching
  // decorators: [
  //   (Story, context) => {
  //     const { vocab, actions } = useVocab(context.args.vocab, {
  //       isSeries: true,
  //       seriesOrWorkId: 'someId',
  //     })
  //     return <Story args={{ ...context.args, actions, vocab }} />
  //   },
  // ],
} satisfies Meta<typeof VocabTable>

type Story = StoryObj<typeof meta>

export const WithFurigana: Story = {
  args: {
    furigana: true,
    seriesOrWork: mockWorkInfo,
    type: VocabTableType.SeriesOrWork,
  },
}

export const WithoutFurigana: Story = {
  args: {
    seriesOrWork: mockSeriesInfo,
    type: VocabTableType.SeriesOrWork,
  },
}
export const KnownVocab: Story = {
  args: {
    type: VocabTableType.Known,
  },
}

export const ExcludedEverywhere: Story = {
  args: {
    type: VocabTableType.Excluded,
  },
}

export default meta
