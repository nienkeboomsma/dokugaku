import { TextInput } from '@mantine/core'

import { type UploadForm } from '../../hooks/useUploadForm'
import AutofillButton from './AutofillButton'

export default function SeriesInput({
  findVolumeNumberBySeriesTitle,
  uploadForm,
}: {
  // eslint-disable-next-line no-unused-vars
  findVolumeNumberBySeriesTitle: (seriesTitle: string) => string
  uploadForm: UploadForm
}) {
  const showAutofillButton = !!(
    uploadForm.values.series &&
    findVolumeNumberBySeriesTitle(uploadForm.values.series) &&
    uploadForm.values.volumeNumber !==
      findVolumeNumberBySeriesTitle(uploadForm.values.series)
  )

  const autofillAction = () =>
    uploadForm.setFieldValue(
      'volumeNumber',
      findVolumeNumberBySeriesTitle(uploadForm.values.series)
    )

  return (
    <TextInput
      disabled={uploadForm.values.series === ''}
      inputMode='numeric'
      label='Volume number'
      rightSection={
        <AutofillButton
          ariaLabel='Autofill volume number'
          onClick={autofillAction}
          showButton={showAutofillButton}
        />
      }
      withAsterisk={uploadForm.values.series !== ''}
      {...uploadForm.getInputProps('volumeNumber')}
    />
  )
}
