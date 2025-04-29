import type { Meta, StoryObj } from '@storybook/react'

import SearchCorpusPage from '../../components/SearchCorpusPage/SearchCorpusPage'
import { mockHits } from '../../../.storybook/fixtures/hits'

const meta = {
  title: 'Search corpus/Page',
  component: SearchCorpusPage,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SearchCorpusPage>

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    getHits: () =>
      Promise.resolve({
        hits: mockHits,
      }),
  },
  decorators: [
    (Story, context) => (
      <div style={{ padding: '1rem' }}>
        <Story {...context.args} />
      </div>
    ),
  ],
}

export default meta
