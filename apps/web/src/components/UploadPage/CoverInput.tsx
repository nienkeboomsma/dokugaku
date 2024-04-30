import { FileInput } from '@mantine/core'
import { IconPhoto } from '@tabler/icons-react'

import { type UploadForm } from '../../hooks/useUploadForm'

export default function CoverInput({ uploadForm }: { uploadForm: UploadForm }) {
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
