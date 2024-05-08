import { useState } from 'react'
import { Button } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { GQL_WorkType } from '@repo/graphql-types'

import classes from './UploadForm.module.css'
import { type ExistingSeries } from '../../types/ExistingSeries'
import { type ExistingAuthors } from '../../types/ExistingAuthors'
import useUploadForm, { type FormValues } from '../../hooks/useUploadForm'
import SeriesInput from './SeriesInput'
import VolumeNumberInput from './VolumeNumberInput'
import TitleInput from './TitleInput'
import AuthorsInput from './AuthorsInput'
import MokuroInput from './MokuroInput'
import CoverInput from './CoverInput'
import FilesInput from './FilesInput'
import { getLowestMissingNumber } from '../../util/getLowestMissingNumber'

export default function UploadForm({
  initialExistingAuthors,
  initialExistingSeries,
  workType,
}: {
  initialExistingAuthors: ExistingAuthors
  initialExistingSeries: ExistingSeries
  workType: GQL_WorkType
}) {
  const { uploadForm, sendFormData } = useUploadForm(workType)
  const [loading, setLoading] = useState(false)
  const [existingAuthors, setExistingAuthors] = useState(initialExistingAuthors)
  const [existingSeries, setExistingSeries] = useState(initialExistingSeries)

  const findAuthorsBySeriesTitle = (seriesTitle: string) => {
    const seriesInfo = existingSeries.find(
      (series) => series.title === seriesTitle
    )

    return seriesInfo ? [...seriesInfo.authors] : []
  }

  const findVolumeNumberBySeriesTitle = (seriesTitle: string) => {
    const seriesInfo = existingSeries.find(
      (series) => series.title === seriesTitle
    )

    return seriesInfo ? seriesInfo.nextVolumeNumber.toString() : ''
  }

  const updateExistingAuthors = (values: FormValues) => {
    const updatedAuthors = new Set([...existingAuthors])

    for (const author of values.authors) {
      updatedAuthors.add(author)
    }

    setExistingAuthors(updatedAuthors)
  }

  const updateExistingSeries = (values: FormValues) => {
    const seriesIndex = existingSeries.findIndex(
      (series) => values.series === series.title
    )

    if (seriesIndex > -1) {
      const updatedSeries = existingSeries.map((series, index) => {
        if (index !== seriesIndex) return series

        const updatedAuthors = new Set([...series.authors])
        for (const author of values.authors) {
          updatedAuthors.add(author)
        }

        const updatedWorkTypes = new Set([...series.workTypes])
        updatedWorkTypes.add(workType)

        const updatedVolumeNumbers = [...series.volumeNumbers]
        updatedVolumeNumbers.push(Number(values.volumeNumber))

        const nextVolumeNumber = getLowestMissingNumber(updatedVolumeNumbers)

        return {
          authors: updatedAuthors,
          nextVolumeNumber,
          title: series.title,
          volumeNumbers: updatedVolumeNumbers,
          workTypes: updatedWorkTypes,
        }
      })

      return setExistingSeries(updatedSeries)
    }

    const newSeriesEntry = {
      authors: new Set(values.authors),
      nextVolumeNumber: Number(values.volumeNumber) + 1,
      title: values.title,
      volumeNumbers: [Number(values.volumeNumber)],
      workTypes: new Set([workType]),
    }

    setExistingSeries((prev) => [...prev, newSeriesEntry])
  }

  const submitHandler = async (
    values: FormValues,
    event: React.FormEvent<HTMLFormElement> | undefined
  ) => {
    setLoading(true)
    try {
      const data = await sendFormData(values, event)

      if (data.error) {
        return notifications.show({
          title: `Unable to process ${values.title}`,
          message: data.error,
        })
      }

      updateExistingAuthors(values)
      updateExistingSeries(values)
      // TODO: the file uploads are cleared, but APPEAR like they still have a selection
      uploadForm.reset()
      notifications.show({
        title: `${values.title} uploaded successfully`,
        message: `Please check back in about ${Math.ceil(data.estimatedDurationInMin)} minutes`,
      })
    } catch {
      notifications.show({
        title: 'Something went wrong',
        message: 'Please try again later',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      className={classes.form}
      onSubmit={uploadForm.onSubmit(submitHandler)}
    >
      <SeriesInput existingSeries={existingSeries} uploadForm={uploadForm} />
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

      {workType === GQL_WorkType.Manga && (
        <MokuroInput uploadForm={uploadForm} />
      )}
      {workType === GQL_WorkType.Novel && (
        <CoverInput uploadForm={uploadForm} />
      )}

      <FilesInput workType={workType} uploadForm={uploadForm} />

      <Button
        mt={20}
        loaderProps={{ type: 'dots' }}
        loading={loading}
        type='submit'
        variant='filled'
      >
        Upload
      </Button>
    </form>
  )
}
