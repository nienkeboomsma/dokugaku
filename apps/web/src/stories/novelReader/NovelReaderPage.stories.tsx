import type { Meta, StoryObj } from '@storybook/react'

import NovelReaderPage from '../../components/NovelReaderPage/NovelReaderPage'
import { ApolloMockedProvider } from '../../../.storybook/decorators/mocks'
import { updateWorkProgress } from '../../../.storybook/mocks/updateWorkProgress'
import { rtl } from '../../../.storybook/decorators/rtl'
import { mockNovelTextNodes } from '../../../.storybook/fixtures/novelTextNodes'

const meta: Meta<typeof NovelReaderPage> = {
  title: 'Novel reader/Page',
  component: NovelReaderPage,
  // TODO: this should be a stateless component in the first place, then there
  // is no need to get mock Apollo data involved
  decorators: [ApolloMockedProvider([updateWorkProgress]), rtl],
}

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    initialProgress: 3,
    textNodes: mockNovelTextNodes,
    workId: 'xyz',
  },
}

export default meta
