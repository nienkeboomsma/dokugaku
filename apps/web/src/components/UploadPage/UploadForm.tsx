import { Button } from '@mantine/core'
import { GQL_WorkType } from '@repo/graphql-types'

import classes from './UploadForm.module.css'
import useUploadForm from '../../hooks/useUploadForm'
import SeriesInput from './SeriesInput'
import VolumeNumberInput from './VolumeNumberInput'
import TitleInput from './TitleInput'
import AuthorsInput from './AuthorsInput'
import MokuroInput from './MokuroInput'
import CoverInput from './CoverInput'
import FilesInput from './FilesInput'
import { type ExistingSeries } from '../../types/uploadForm'

export default function UploadForm({
  existingAuthors,
  existingSeries,
  type,
}: {
  existingAuthors: string[]
  existingSeries: ExistingSeries[]
  type: GQL_WorkType
}) {
  const { uploadForm, submitHandler } = useUploadForm(type)

  const findVolumeNumberBySeriesTitle = (seriesTitle: string) => {
    const seriesInfo = existingSeries.find(
      (series) => series.title === seriesTitle
    )

    return seriesInfo ? seriesInfo.nextVolumeNumber.toString() : ''
  }

  const findAuthorsBySeriesTitle = (seriesTitle: string) => {
    const seriesInfo = existingSeries.find(
      (series) => series.title === seriesTitle
    )

    return seriesInfo ? seriesInfo.authors : []
  }

  return (
    <form
      className={classes.form}
      onSubmit={uploadForm.onSubmit(submitHandler)}
    >
      <SeriesInput
        existingSeriesTitles={existingSeries.map((series) => series.title)}
        uploadForm={uploadForm}
      />
      <VolumeNumberInput
        findVolumeNumberBySeriesTitle={findVolumeNumberBySeriesTitle}
        uploadForm={uploadForm}
      />
      <TitleInput uploadForm={uploadForm} />
      <AuthorsInput
        existingAuthors={existingAuthors}
        findAuthorsBySeriesTitle={findAuthorsBySeriesTitle}
        uploadForm={uploadForm}
      />

      {type === GQL_WorkType.Manga && <MokuroInput uploadForm={uploadForm} />}
      {type === GQL_WorkType.Novel && <CoverInput uploadForm={uploadForm} />}

      <FilesInput type={type} uploadForm={uploadForm} />

      <Button mt={20} type='submit' variant='filled'>
        Upload
      </Button>
    </form>
  )
}
