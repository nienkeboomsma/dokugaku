import { FileInput } from '@mantine/core'
import { IconPhoto, IconFiles } from '@tabler/icons-react'

import type { WorkUploadForm } from '../../hooks/useWorkUploadForm'
import { GQL_WorkType } from '@repo/graphql-types'

const getAcceptedExtensions = (
  form: WorkUploadForm,
  workType: GQL_WorkType
) => {
  // TODO: these should be in a package so work-processor can also use them
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp']
  const mangaExtensions = [...imageExtensions, '.json']
  const novelTextExtensions = ['.html', '.md', '.txt']

  if (workType === GQL_WorkType.Manga) {
    return form.values.mokuro ? mangaExtensions : imageExtensions
  }
  if (workType === GQL_WorkType.Novel) {
    return [...novelTextExtensions, ...imageExtensions]
  }

  return workType satisfies never
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
      accept={getAcceptedExtensions(form, workType).join(',')}
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
