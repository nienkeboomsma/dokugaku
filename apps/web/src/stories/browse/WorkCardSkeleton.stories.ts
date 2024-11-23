import type { Meta, StoryObj } from '@storybook/react'

import WorkCardSkeleton from '../../components/Browse/WorkCardSkeleton'
import {
  WorkCardMaxWidth,
  WorkCardMinWidthMobile,
} from '../../components/Browse/WorkCard'
import { resizer } from '../../../.storybook/decorators/resizer'

const meta = {
  title: 'Browse/Work card skeleton',
  component: WorkCardSkeleton,
  decorators: [
    resizer({
      contentMinWidth: WorkCardMinWidthMobile,
      contentMaxWidth: WorkCardMaxWidth,
      padding: '1rem',
    }),
  ],
} satisfies Meta<typeof WorkCardSkeleton>

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export default meta
