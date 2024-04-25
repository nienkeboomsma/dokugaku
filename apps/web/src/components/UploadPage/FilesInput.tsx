import { FileInput } from '@mantine/core'
import { IconPhoto, IconFiles } from '@tabler/icons-react'

import { type UploadForm } from '../../hooks/useUploadForm'
import { GQL_WorkType } from '@repo/graphql-types'

const getAcceptedExtensions = (uploadForm: UploadForm, type: GQL_WorkType) => {
  if (type === GQL_WorkType.Manga) {
    return `.png, .jpg, .jpeg, .webp${uploadForm.values.mokuro ? ', .json' : ''}`
  }
  if (type === GQL_WorkType.Novel) {
    return '.html, .md, .txt'
  }
}

const getLabel = (type: GQL_WorkType) => {
  if (type === GQL_WorkType.Manga) {
    return 'Upload manga images'
  }
  if (type === GQL_WorkType.Novel) {
    return 'Upload text files'
  }
}

const RightSection = ({ type }: { type: GQL_WorkType }) => {
  if (type === GQL_WorkType.Manga) {
    return <IconPhoto size={18} stroke={1.5} />
  }
  if (type === GQL_WorkType.Novel) {
    return <IconFiles size={18} stroke={1.5} />
  }
}

export default function FilesInput({
  type,
  uploadForm,
}: {
  type: GQL_WorkType
  uploadForm: UploadForm
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
