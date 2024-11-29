import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import MinimumValueFilters from '../../../components/VocabTable/VocabFilter/MinimumValueFilters'

const meta = {
  title: 'Vocab/Filter/Minimum value filters',
  component: MinimumValueFilters,
} satisfies Meta<typeof MinimumValueFilters>

type Story = StoryObj<typeof meta>

const initialMinimumValues = {
  volume: 4,
  page: 26,
  frequency: 1,
}

export const Default: Story = {
  args: {
    minimumValues: initialMinimumValues,
    setMinimumValues: () => {},
    showMinimumPageNumberFilter: true,
    showMinimumVolumeNumberFilter: true,
  },
  decorators: [
    (Story, context) => {
      const [minimumValues, setMinimumValues] = useState(initialMinimumValues)

      return (
        <Story args={{ ...context.args, minimumValues, setMinimumValues }} />
      )
    },
  ],
}

export default meta
