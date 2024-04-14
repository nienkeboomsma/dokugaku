import type { Meta, StoryObj } from '@storybook/react'
import UploadPage from '../../components/UploadPage/UploadPage'

const meta = {
  title: 'Upload/Page',
  component: UploadPage,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof UploadPage>

type Story = StoryObj<typeof meta>

export const Tabs: Story = {
  args: {},
}

export default meta
