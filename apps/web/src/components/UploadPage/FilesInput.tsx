import { FileInput } from '@mantine/core'
import { IconPhoto, IconFiles } from '@tabler/icons-react'

import { type UploadForm } from '../../hooks/useUploadForm'
import { GQL_WorkType } from '@repo/graphql-types'

const getAcceptedExtensions = (
  uploadForm: UploadForm,
  workType: GQL_WorkType
) => {
  if (workType === GQL_WorkType.Manga) {
    return `.png, .jpg, .jpeg, .webp${uploadForm.values.mokuro ? ', .json' : ''}`
  }
  if (workType === GQL_WorkType.Novel) {
    return '.html, .md, .txt'
  }
}

const getLabel = (workType: GQL_WorkType) => {
  if (workType === GQL_WorkType.Manga) {
    return 'Upload manga images'
  }
  if (workType === GQL_WorkType.Novel) {
    return 'Upload text files'
  }
}

const RightSection = ({ workType }: { workType: GQL_WorkType }) => {
  if (workType === GQL_WorkType.Manga) {
    return <IconPhoto size={18} stroke={1.5} />
  }
  if (workType === GQL_WorkType.Novel) {
    return <IconFiles size={18} stroke={1.5} />
  }
}

export default function FilesInput({
  workType,
  uploadForm,
}: {
  workType: GQL_WorkType
  uploadForm: UploadForm
}) {
  return (
    <FileInput
      accept={getAcceptedExtensions(uploadForm, workType)}
      clearable
      label={getLabel(workType)}
      rightSection={<RightSection workType={workType} />}
      rightSectionPointerEvents='none'
      multiple
      withAsterisk
      {...uploadForm.getInputProps('files')}
    />
  )
}
