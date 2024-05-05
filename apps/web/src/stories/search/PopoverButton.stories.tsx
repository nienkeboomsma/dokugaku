import type { Meta, StoryObj } from '@storybook/react'
import { IconArrowsSort } from '@tabler/icons-react'

import PopoverButton from '../../components/SearchFilterSort/PopoverButton'

const meta = {
  title: 'Search/Popover button',
  component: PopoverButton,
} satisfies Meta<typeof PopoverButton>

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    buttonIcon: IconArrowsSort,
    buttonLabel: 'some ARIA label',
    children: 'some React node',
  },
}

export default meta
