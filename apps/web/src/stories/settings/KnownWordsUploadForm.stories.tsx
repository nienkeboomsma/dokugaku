import type { Meta, StoryObj } from '@storybook/react'

import KnownWordsUploadForm from '../../components/SettingsPage/KnownWordsUploadForm'

const meta = {
  title: 'Settings/Known words form',
  component: KnownWordsUploadForm,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof KnownWordsUploadForm>

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export default meta
