import type { Meta, StoryObj } from '@storybook/react'

import WorkCard, {
  WorkCardMaxWidth,
  WorkCardMinWidthMobile,
} from '../../components/BrowsePage/WorkCard'
import { mockWorkCardInfo } from '../../fixtures/workCardInfo'
import { WorkCardInfo } from '../../types/WorkCardInfo'
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
  args: { workCardInfo: mockWorkCardInfo[0] as WorkCardInfo },
}

export const NotSeries: Story = {
  args: { workCardInfo: mockWorkCardInfo[1] as WorkCardInfo },
}

export const MissingKnownVocab: Story = {
  args: { workCardInfo: mockWorkCardInfo[2] as WorkCardInfo },
}

export const MissingStatus: Story = {
  args: { workCardInfo: mockWorkCardInfo[3] as WorkCardInfo },
}

export default meta
