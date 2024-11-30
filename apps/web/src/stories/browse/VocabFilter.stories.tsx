import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { GQL_ReadStatus } from '@repo/graphql-types'

import WorkCardFilter from '../../components/BrowsePage/WorkCardFilter'
import type { StatusOptions } from '../../components/BrowsePage/BrowsePage'

const meta = {
  title: 'Browse/Work card filter',
  component: WorkCardFilter,
} satisfies Meta<typeof WorkCardFilter>

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    showStatusOptions: {} as StatusOptions,
    setShowStatusOptions: () => {},
  },
  decorators: [
    (Story) => {
      const [showStatusOptions, setShowStatusOptions] = useState<StatusOptions>(
        {
          [GQL_ReadStatus.Abandoned]: { checked: true, label: 'Abandoned' },
          [GQL_ReadStatus.New]: { checked: true, label: 'New' },
          [GQL_ReadStatus.Read]: { checked: true, label: 'Read' },
          [GQL_ReadStatus.Reading]: { checked: true, label: 'Reading' },
          [GQL_ReadStatus.WantToRead]: { checked: true, label: 'Want to read' },
        }
      )

      return <Story args={{ showStatusOptions, setShowStatusOptions }} />
    },
  ],
}

export default meta
