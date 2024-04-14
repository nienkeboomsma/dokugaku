import { TagsInput } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'

import { FormValues } from '../../hooks/useUploadForm'

export default function AuthorsInput({
  existingAuthors,
  uploadForm,
}: {
  existingAuthors: string[]
  uploadForm: UseFormReturnType<FormValues>
}) {
  return (
    <TagsInput
      label='Author(s)'
      data={existingAuthors}
      withAsterisk
      {...uploadForm.getInputProps('authors')}
    />
  )
}
