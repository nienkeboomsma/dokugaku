import { TextInput } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'

import { FormValues } from '../../hooks/useUploadForm'

export default function SeriesInput({
  uploadForm,
}: {
  uploadForm: UseFormReturnType<FormValues>
}) {
  return (
    <TextInput
      disabled={uploadForm.values.series === ''}
      inputMode='numeric'
      label='Volume number'
      withAsterisk={uploadForm.values.series !== ''}
      {...uploadForm.getInputProps('volumeNumber')}
    />
  )
}
