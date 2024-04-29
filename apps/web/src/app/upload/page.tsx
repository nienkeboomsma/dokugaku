import { GQL_WorkType } from '@repo/graphql-types'

import UploadPage from '../../components/UploadPage/UploadPage'
import { getExistingAuthors } from '../../graphql/getExistingAuthors'
import { getExistingSeries } from '../../graphql/getExistingSeries'

// TODO: as the collection grows, it might make more sense to fetch
//       this data once the user starts typing a series title or author name

export default async function Upload() {
  const existingAuthors = await getExistingAuthors()
  const existingSeries = await getExistingSeries()

  const existingMangaSeries = existingSeries.filter((series) =>
    series.workTypes.has(GQL_WorkType.Manga)
  )

  const existingNovelSeries = existingSeries.filter((series) =>
    series.workTypes.has(GQL_WorkType.Novel)
  )

  return (
    <UploadPage
      existingAuthors={existingAuthors}
      existingMangaSeries={existingMangaSeries}
      existingNovelSeries={existingNovelSeries}
    />
  )
}
