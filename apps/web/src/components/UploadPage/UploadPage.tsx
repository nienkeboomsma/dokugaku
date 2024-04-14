'use client'

import { Tabs } from '@mantine/core'

import classes from './UploadPage.module.css'
import PaperContainer from '../PaperContainer/PaperContainer'
import UploadForm from './UploadForm'

export default function UploadPage() {
  return (
    <PaperContainer maxWidth='28rem'>
      <Tabs variant='unstyled' defaultValue='manga' classNames={classes}>
        <Tabs.List>
          <Tabs.Tab value='manga'>Manga</Tabs.Tab>
          <Tabs.Tab value='novel'>Novel</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value='manga'>
          <UploadForm type='manga' />
        </Tabs.Panel>
        <Tabs.Panel value='novel'>
          <UploadForm type='novel' />
        </Tabs.Panel>
      </Tabs>
    </PaperContainer>
  )
}
