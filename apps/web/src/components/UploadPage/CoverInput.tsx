import { FileInput } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import { IconPhoto } from '@tabler/icons-react'

import { FormValues } from '../../hooks/useUploadForm'

export default function CoverInput({
  uploadForm,
}: {
  uploadForm: UseFormReturnType<FormValues>
}) {
  return (
    <FileInput
      accept='.png, .jpg, .jpeg, .webp'
      clearable
      label='Upload cover image'
      rightSection={<IconPhoto size={18} stroke={1.5} />}
      rightSectionPointerEvents='none'
      withAsterisk
      {...uploadForm.getInputProps('cover')}
    />
  )
}
