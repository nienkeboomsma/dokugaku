import type { Meta, StoryObj } from '@storybook/react'
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
    type: 'manga',
  },
}

export const Novel: Story = {
  args: {
    type: 'novel',
  },
}

export default meta
