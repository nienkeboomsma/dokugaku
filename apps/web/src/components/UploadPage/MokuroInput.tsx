import { Checkbox } from '@mantine/core'

import type { WorkUploadForm } from '../../hooks/useWorkUploadForm'

export default function MokuroInput({ form }: { form: WorkUploadForm }) {
  return (
    <Checkbox
      label='I have already run the files through Mokuro'
      mb={6}
      mt={12}
      {...form.getInputProps('mokuro', { type: 'checkbox' })}
    />
  )
}
