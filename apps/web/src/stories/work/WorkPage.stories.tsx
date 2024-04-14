import type { Meta, StoryObj } from '@storybook/react'
import WorkPage from '../../components/WorkPage/WorkPage'
import { mockWorkInfo } from '../../fixtures/workInfo'

const meta = {
  title: 'Work/Page',
  component: WorkPage,
} satisfies Meta<typeof WorkPage>

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    work: mockWorkInfo,
  },
}

export default meta
