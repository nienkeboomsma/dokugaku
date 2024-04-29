import { Autocomplete } from '@mantine/core'

import { type ExistingSeries } from '../../types/ExistingSeries'
import { UploadForm } from '../../hooks/useUploadForm'

export default function SeriesInput({
  existingSeries,
  uploadForm,
}: {
  existingSeries: ExistingSeries
  uploadForm: UploadForm
}) {
  return (
    <Autocomplete
      data={existingSeries.map((series) => series.title)}
      label='Series'
      {...uploadForm.getInputProps('series')}
    />
  )
}
