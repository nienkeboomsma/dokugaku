import { useState } from 'react'
import { Button } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { GQL_WorkType } from '@repo/graphql-types'

import classes from './WorkUploadForm.module.css'
import type { ExistingSeries } from '../../types/ExistingSeries'
import type { ExistingAuthors } from '../../types/ExistingAuthors'
import useWorkUploadForm, {
  type FormValues,
} from '../../hooks/useWorkUploadForm'
import SeriesInput from './SeriesInput'
import VolumeNumberInput from './VolumeNumberInput'
import TitleInput from './TitleInput'
import AuthorsInput from './AuthorsInput'
import MokuroInput from './MokuroInput'
import CoverInput from './CoverInput'
import FilesInput from './FilesInput'
import { getLowestMissingNumber } from '../../util/getLowestMissingNumber'

export default function WorkUploadForm({
  initialExistingAuthors,
  initialExistingSeries,
  workType,
}: {
  initialExistingAuthors: ExistingAuthors
  initialExistingSeries: ExistingSeries
  workType: GQL_WorkType
}) {
  const { form, sendFormData } = useWorkUploadForm(workType)
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

    return seriesInfo ? seriesInfo.nextVolumeNumber.toString() : '1'
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

    const volumeNumbers = [Number(values.volumeNumber)]

    const newSeriesEntry = {
      authors: new Set(values.authors),
      nextVolumeNumber: getLowestMissingNumber(volumeNumbers),
      title: values.series,
      volumeNumbers,
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
        notifications.show({
          title: `Unable to process ${values.title}`,
          message: data.error,
        })
        return setLoading(false)
      }

      updateExistingAuthors(values)
      updateExistingSeries(values)
      // TODO: the image file uploads are cleared, but APPEAR like they still
      // have a selection (not a problem with text upload for novels though)
      form.reset()
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
    <form className={classes.form} onSubmit={form.onSubmit(submitHandler)}>
      <SeriesInput existingSeries={existingSeries} form={form} />
      <VolumeNumberInput
        findVolumeNumberBySeriesTitle={findVolumeNumberBySeriesTitle}
        form={form}
      />
      <TitleInput form={form} />
      <AuthorsInput
        existingAuthors={existingAuthors}
        findAuthorsBySeriesTitle={findAuthorsBySeriesTitle}
        form={form}
      />

      {workType === GQL_WorkType.Manga && <MokuroInput form={form} />}
      {workType === GQL_WorkType.Novel && <CoverInput form={form} />}

      <FilesInput workType={workType} form={form} />

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
