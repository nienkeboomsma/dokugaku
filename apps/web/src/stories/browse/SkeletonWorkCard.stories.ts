import type { Meta, StoryObj } from '@storybook/react'

import SkeletonWorkCard from '../../components/Browse/SkeletonWorkCard'
import {
  WorkCardMaxWidth,
  WorkCardMinWidthMobile,
} from '../../components/Browse/WorkCard'
import { mockWorkCards } from '../../../.storybook/fixtures/workCards'
import { resizer } from '../../../.storybook/decorators/resizer'

const meta = {
  title: 'Browse/Skeleton work card',
  component: SkeletonWorkCard,
  decorators: [
    resizer({
      contentMinWidth: WorkCardMinWidthMobile,
      contentMaxWidth: WorkCardMaxWidth,
      padding: '1rem',
    }),
  ],
} satisfies Meta<typeof SkeletonWorkCard>

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
