import type { Meta, StoryObj } from '@storybook/react'
import PaperContainer from '../../components/PaperContainer/PaperContainer'

const meta = {
  title: 'Layout/Paper container',
  component: PaperContainer,
} satisfies Meta<typeof PaperContainer>

type Story = StoryObj<typeof meta>

export const WithHeading: Story = {
  args: {
    children: 'Some sample text.',
    heading: 'Empty section',
  },
}

export const WithoutHeading: Story = {
  args: {
    children: 'Some sample text.',
  },
}

export default meta
