import { Meta, StoryObj } from '@storybook/react'
import JLPTLabel from '../../components/VocabTable/JLPTLabel'

const meta = {
  title: 'Vocab/JLPT label',
  component: JLPTLabel,
} satisfies Meta<typeof JLPTLabel>

type Story = StoryObj<typeof meta>

export const N5: Story = {
  name: 'N5',
  args: {
    jlpt: 'N5',
  },
}

export const N4: Story = {
  name: 'N4',
  args: {
    jlpt: 'N4',
  },
}

export const N3: Story = {
  name: 'N3',
  args: {
    jlpt: 'N3',
  },
}

export const N2: Story = {
  name: 'N2',
  args: {
    jlpt: 'N2',
  },
}

export const N1: Story = {
  name: 'N1',
  args: {
    jlpt: 'N1',
  },
}

export default meta
