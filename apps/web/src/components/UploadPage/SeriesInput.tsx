import { Autocomplete } from '@mantine/core'

import type { ExistingSeries } from '../../types/ExistingSeries'
import type { WorkUploadForm } from '../../hooks/useWorkUploadForm'

export default function SeriesInput({
  existingSeries,
  form,
}: {
  existingSeries: ExistingSeries
  form: WorkUploadForm
}) {
  return (
    <Autocomplete
      data={existingSeries.map((series) => series.title)}
      label='Series'
      {...form.getInputProps('series')}
    />
  )
}
