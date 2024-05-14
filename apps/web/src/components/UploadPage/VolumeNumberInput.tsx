import { TextInput } from '@mantine/core'

import type { WorkUploadForm } from '../../hooks/useWorkUploadForm'
import AutofillButton from './AutofillButton'

export default function SeriesInput({
  findVolumeNumberBySeriesTitle,
  form,
}: {
  // eslint-disable-next-line no-unused-vars
  findVolumeNumberBySeriesTitle: (seriesTitle: string) => string
  form: WorkUploadForm
}) {
  const showAutofillButton = !!(
    form.values.series &&
    findVolumeNumberBySeriesTitle(form.values.series) &&
    form.values.volumeNumber !==
      findVolumeNumberBySeriesTitle(form.values.series)
  )

  const autofillAction = () =>
    form.setFieldValue(
      'volumeNumber',
      findVolumeNumberBySeriesTitle(form.values.series)
    )

  return (
    <TextInput
      disabled={form.values.series === ''}
      inputMode='numeric'
      label='Volume number'
      rightSection={
        <AutofillButton
          ariaLabel='Autofill volume number'
          onClick={autofillAction}
          showButton={showAutofillButton}
        />
      }
      withAsterisk={form.values.series !== ''}
      {...form.getInputProps('volumeNumber')}
    />
  )
}
