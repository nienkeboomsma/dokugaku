import type { Meta, StoryObj } from '@storybook/react'
import { GQL_WorkType } from '@repo/graphql-types'

import UploadForm from '../../components/UploadPage/UploadForm'
import { mockExistingAuthors } from '../../fixtures/existingAuthors'
import { mockExistingSeries } from '../../fixtures/existingSeries'

// avoiding 'satisfies' fixes TS error with decorators (Storybook issue #24656)
const meta: Meta<typeof UploadForm> = {
  title: 'Upload/Form',
  component: UploadForm,
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

export const WithoutExistingData: Story = {
  args: {
    initialExistingAuthors: new Set(),
    initialExistingSeries: [],
    workType: GQL_WorkType.Novel,
  },
}

export default meta
