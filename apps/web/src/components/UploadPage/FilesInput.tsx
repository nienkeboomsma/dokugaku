import { FileInput } from '@mantine/core'
import { IconPhoto, IconFiles } from '@tabler/icons-react'

import type { WorkUploadForm } from '../../hooks/useWorkUploadForm'
import { GQL_WorkType } from '@repo/graphql-types'

const getAcceptedExtensions = (
  form: WorkUploadForm,
  workType: GQL_WorkType
) => {
  if (workType === GQL_WorkType.Manga) {
    return `.png, .jpg, .jpeg, .webp${form.values.mokuro ? ', .json' : ''}`
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
  form,
}: {
  workType: GQL_WorkType
  form: WorkUploadForm
}) {
  return (
    <FileInput
      accept={getAcceptedExtensions(form, workType)}
      clearable
      label={getLabel(workType)}
      rightSection={<RightSection workType={workType} />}
      rightSectionPointerEvents='none'
      multiple
      withAsterisk
      {...form.getInputProps('files')}
    />
  )
}
