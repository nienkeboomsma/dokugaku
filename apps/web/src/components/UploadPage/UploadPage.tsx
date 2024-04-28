'use client'

import { Tabs } from '@mantine/core'

import classes from './UploadPage.module.css'
import PaperContainer from '../PaperContainer/PaperContainer'
import UploadForm from './UploadForm'
import { GQL_WorkType } from '@repo/graphql-types'
import { ExistingSeries } from '../../types/uploadForm'

export default function UploadPage({
  existingAuthors,
  existingMangaSeries,
  existingNovelSeries,
}: {
  existingAuthors: Set<string>
  existingMangaSeries: ExistingSeries[]
  existingNovelSeries: ExistingSeries[]
}) {
  return (
    <PaperContainer maxWidth='28rem'>
      <Tabs variant='unstyled' defaultValue='manga' classNames={classes}>
        <Tabs.List>
          <Tabs.Tab value='manga'>Manga</Tabs.Tab>
          <Tabs.Tab value='novel'>Novel</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value='manga'>
          <UploadForm
            initialExistingAuthors={existingAuthors}
            initialExistingSeries={existingMangaSeries}
            workType={GQL_WorkType.Manga}
          />
        </Tabs.Panel>
        <Tabs.Panel value='novel'>
          <UploadForm
            initialExistingAuthors={existingAuthors}
            initialExistingSeries={existingNovelSeries}
            workType={GQL_WorkType.Novel}
          />
        </Tabs.Panel>
      </Tabs>
    </PaperContainer>
  )
}
