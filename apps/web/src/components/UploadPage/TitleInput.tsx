import { TextInput } from '@mantine/core'

import { type UploadForm } from '../../hooks/useUploadForm'
import AutofillButton from './AutofillButton'

export default function TitleInput({ uploadForm }: { uploadForm: UploadForm }) {
  const showAutofillButton = !!(
    uploadForm.values.series &&
    uploadForm.values.volumeNumber &&
    uploadForm.values.title !==
      `${uploadForm.values.series} ${uploadForm.values.volumeNumber}`
  )

  const autofillAction = () =>
    uploadForm.setFieldValue(
      'title',
      `${uploadForm.values.series} ${uploadForm.values.volumeNumber}`
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
      {...uploadForm.getInputProps('title')}
    />
  )
}
