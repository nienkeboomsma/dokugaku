'use client'

import { Tabs } from '@mantine/core'
import { GQL_WorkType } from '@repo/graphql-types'

import classes from './UploadPage.module.css'
import { type ExistingSeries } from '../../types/ExistingSeries'
import { type ExistingAuthors } from '../../types/ExistingAuthors'
import PaperContainer from '../PaperContainer/PaperContainer'
import WorkUploadForm from './WorkUploadForm'

export default function UploadPage({
  existingAuthors,
  existingMangaSeries,
  existingNovelSeries,
}: {
  existingAuthors: ExistingAuthors
  existingMangaSeries: ExistingSeries
  existingNovelSeries: ExistingSeries
}) {
  return (
    <PaperContainer maxWidth='28rem'>
      <Tabs variant='unstyled' defaultValue='manga' classNames={classes}>
        <Tabs.List>
          <Tabs.Tab value='manga'>Manga</Tabs.Tab>
          <Tabs.Tab value='novel'>Novel</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value='manga'>
          <WorkUploadForm
            initialExistingAuthors={existingAuthors}
            initialExistingSeries={existingMangaSeries}
            workType={GQL_WorkType.Manga}
          />
        </Tabs.Panel>
        <Tabs.Panel value='novel'>
          <WorkUploadForm
            initialExistingAuthors={existingAuthors}
            initialExistingSeries={existingNovelSeries}
            workType={GQL_WorkType.Novel}
          />
        </Tabs.Panel>
      </Tabs>
    </PaperContainer>
  )
}
