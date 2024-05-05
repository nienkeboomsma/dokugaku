import type { Meta, StoryObj } from '@storybook/react'

import WorkCard, {
  WorkCardMaxWidth,
  WorkCardMinWidthMobile,
} from '../../components/BrowsePage/WorkCard'
import { mockWorkCards } from '../../../.storybook/fixtures/workCards'
import { resizer } from '../../../.storybook/decorators/resizer'

const meta = {
  title: 'Browse/Work card',
  component: WorkCard,
  decorators: [
    resizer({
      contentMinWidth: WorkCardMinWidthMobile,
      contentMaxWidth: WorkCardMaxWidth,
      padding: '1rem',
    }),
  ],
} satisfies Meta<typeof WorkCard>

type Story = StoryObj<typeof meta>

export const Series: Story = {
  args: { workCardInfo: mockWorkCards[0] },
}

export const NotSeries: Story = {
  args: { workCardInfo: mockWorkCards[1] },
}

export const MissingCover: Story = {
  args: { workCardInfo: mockWorkCards[3] },
}

export default meta
