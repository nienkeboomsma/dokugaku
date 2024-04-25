import { Checkbox } from '@mantine/core'

import { UploadForm } from '../../hooks/useUploadForm'

export default function MokuroInput({
  uploadForm,
}: {
  uploadForm: UploadForm
}) {
  return (
    <Checkbox
      label='I have already run the files through Mokuro'
      mb={6}
      mt={12}
      {...uploadForm.getInputProps('mokuro', { type: 'checkbox' })}
    />
  )
}
