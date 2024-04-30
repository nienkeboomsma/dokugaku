import type { Meta, StoryObj } from '@storybook/react'

import WorkPage from '../../components/WorkPage/WorkPage'
import { mockWorkInfo } from '../../fixtures/workInfo'
import { mockVocab } from '../../fixtures/vocab'

const meta = {
  title: 'Work/Page',
  component: WorkPage,
} satisfies Meta<typeof WorkPage>

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    initialVocab: mockVocab,
    work: mockWorkInfo,
  },
}

export default meta
