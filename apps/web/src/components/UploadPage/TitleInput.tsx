import { TextInput } from '@mantine/core'

import type { WorkUploadForm } from '../../hooks/useWorkUploadForm'
import AutofillButton from './AutofillButton'

export default function TitleInput({ form }: { form: WorkUploadForm }) {
  const showAutofillButton = !!(
    form.values.series &&
    form.values.volumeNumber &&
    form.values.title !== `${form.values.series} ${form.values.volumeNumber}`
  )

  const autofillAction = () =>
    form.setFieldValue(
      'title',
      `${form.values.series} ${form.values.volumeNumber}`
    )

  return (
    <TextInput
      label='Title'
      rightSection={
        <AutofillButton
          ariaLabel='Autofill title'
          onClick={autofillAction}
          showButton={showAutofillButton}
        />
      }
      withAsterisk
      {...form.getInputProps('title')}
    />
  )
}
