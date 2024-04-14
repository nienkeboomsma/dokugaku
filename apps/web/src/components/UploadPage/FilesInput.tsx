import { FileInput } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import { IconPhoto, IconFiles } from '@tabler/icons-react'

import { FormType, FormValues } from '../../hooks/useUploadForm'

const getAcceptedExtensions = (
  uploadForm: UseFormReturnType<FormValues>,
  type: FormType
) => {
  if (type === 'manga') {
    return `.png, .jpg, .jpeg, .webp${uploadForm.values.mokuro ? ', .json' : ''}`
  }
  if (type === 'novel') {
    return '.html, .md, .txt'
  }
}

const getLabel = (type: FormType) => {
  if (type === 'manga') {
    return 'Upload manga images'
  }
  if (type === 'novel') {
    return 'Upload text files'
  }
}

const RightSection = ({ type }: { type: FormType }) => {
  if (type === 'manga') {
    return <IconPhoto size={18} stroke={1.5} />
  }
  if (type === 'novel') {
    return <IconFiles size={18} stroke={1.5} />
  }
}

export default function FilesInput({
  type,
  uploadForm,
}: {
  type: FormType
  uploadForm: UseFormReturnType<FormValues>
}) {
  return (
    <FileInput
      accept={getAcceptedExtensions(uploadForm, type)}
      clearable
      label={getLabel(type)}
      rightSection={<RightSection type={type} />}
      rightSectionPointerEvents='none'
      multiple
      withAsterisk
      {...uploadForm.getInputProps('files')}
    />
  )
}
