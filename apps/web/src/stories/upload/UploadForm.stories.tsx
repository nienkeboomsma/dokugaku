import type { Meta, StoryObj } from '@storybook/react'
import { GQL_WorkType } from '@repo/graphql-types'

import UploadForm from '../../components/UploadPage/UploadForm'

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
    initialExistingAuthors: new Set(['田中 太郎']),
    initialExistingSeries: [
      {
        authors: new Set(['田中 太郎']),
        nextVolumeNumber: 5,
        title: 'ドラゴンボール',
        volumeNumbers: [1, 2, 3, 4],
        workTypes: new Set([GQL_WorkType.Manga]),
      },
    ],
    workType: GQL_WorkType.Manga,
  },
}

export const Novel: Story = {
  args: {
    initialExistingAuthors: new Set(['渡辺 謙']),
    initialExistingSeries: [
      {
        authors: new Set(['渡辺 謙']),
        nextVolumeNumber: 2,
        title: 'にゃんにゃん探偵団',
        volumeNumbers: [1, 3],
        workTypes: new Set([GQL_WorkType.Novel]),
      },
    ],
    workType: GQL_WorkType.Novel,
  },
}

export const WithoutExistingData: Story = {
  args: {
    initialExistingAuthors: new Set(['田中 太郎', '渡辺 謙']),
    initialExistingSeries: [],
    workType: GQL_WorkType.Novel,
  },
}

export default meta
