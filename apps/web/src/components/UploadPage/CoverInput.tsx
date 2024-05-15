import { FileInput } from '@mantine/core'
import { IconPhoto } from '@tabler/icons-react'

import type { WorkUploadForm } from '../../hooks/useWorkUploadForm'

export default function CoverInput({ form }: { form: WorkUploadForm }) {
  return (
    <FileInput
      accept='.png, .jpg, .jpeg, .webp'
      clearable
      label='Upload cover image'
      rightSection={<IconPhoto size={18} stroke={1.5} />}
      rightSectionPointerEvents='none'
      withAsterisk
      {...form.getInputProps('cover')}
    />
  )
}
