import type { Meta, StoryObj } from '@storybook/react'
import { GQL_WorkType } from '@repo/graphql-types'

import WorkUploadForm from '../../components/UploadPage/WorkUploadForm'
import { mockExistingAuthors } from '../../../.storybook/fixtures/existingAuthors'
import { mockExistingSeries } from '../../../.storybook/fixtures/existingSeries'

// avoiding 'satisfies' fixes TS error with decorators (Storybook issue #24656)
const meta: Meta<typeof WorkUploadForm> = {
  title: 'Upload/Form',
  component: WorkUploadForm,
  decorators: [
    (Story) => (
      <div style={{ width: '25rem' }}>
        <Story />
      </div>
    ),
  ],
}

type Story = StoryObj<typeof meta>

export const Manga: Story = {
  args: {
    initialExistingAuthors: mockExistingAuthors[0],
    initialExistingSeries: mockExistingSeries[0],
    workType: GQL_WorkType.Manga,
  },
}

export const Novel: Story = {
  args: {
    initialExistingAuthors: mockExistingAuthors[1],
    initialExistingSeries: mockExistingSeries[1],
    workType: GQL_WorkType.Novel,
  },
}

export const NoData: Story = {
  args: {
    initialExistingAuthors: new Set(),
    initialExistingSeries: [],
    workType: GQL_WorkType.Novel,
  },
}

export default meta
