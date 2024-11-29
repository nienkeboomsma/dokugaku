import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import CheckboxGroup, {
  type Options,
} from '../../../components/VocabTable/VocabFilter/CheckboxGroup'

const meta = {
  title: 'Vocab/Filter/Checkbox group',
  component: CheckboxGroup,
} satisfies Meta<typeof CheckboxGroup>

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    options: {},
    setOptions: () => {},
  },
  decorators: [
    (Story) => {
      const [options, setOptions] = useState({
        N1: {
          checked: true,
        },
        N2: {
          checked: true,
        },
        N3: {
          checked: true,
        },
        N4: {
          checked: true,
        },
        N5: {
          checked: true,
        },
        nonJlpt: {
          checked: false,
          label: 'Non-JLPT',
        },
      } as Options)

      return <Story args={{ options, setOptions }} />
    },
  ],
}

export default meta
