import { Autocomplete } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'

import { FormValues } from '../../hooks/useUploadForm'

export default function SeriesInput({
  existingSeries,
  uploadForm,
}: {
  existingSeries: string[]
  uploadForm: UseFormReturnType<FormValues>
}) {
  return (
    <Autocomplete
      data={existingSeries}
      label='Series'
      {...uploadForm.getInputProps('series')}
    />
  )
}
