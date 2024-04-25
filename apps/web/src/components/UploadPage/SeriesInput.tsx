import { Autocomplete } from '@mantine/core'

import { UploadForm } from '../../hooks/useUploadForm'

export default function SeriesInput({
  existingSeriesTitles,
  uploadForm,
}: {
  existingSeriesTitles: string[]
  uploadForm: UploadForm
}) {
  return (
    <Autocomplete
      data={existingSeriesTitles}
      label='Series'
      {...uploadForm.getInputProps('series')}
    />
  )
}
