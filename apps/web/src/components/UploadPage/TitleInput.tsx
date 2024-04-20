import { ActionIcon, TextInput } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import { IconWand } from '@tabler/icons-react'

import { FormValues } from '../../hooks/useUploadForm'

export default function TitleInput({
  uploadForm,
}: {
  uploadForm: UseFormReturnType<FormValues>
}) {
  return (
    <TextInput
      label='Title'
      rightSection={
        uploadForm.values.series &&
        uploadForm.values.volumeNumber &&
        uploadForm.values.title !==
          `${uploadForm.values.series} ${uploadForm.values.volumeNumber}` && (
          <ActionIcon
            aria-label={'Autofill title'}
            onClick={() =>
              uploadForm.setFieldValue(
                'title',
                `${uploadForm.values.series} ${uploadForm.values.volumeNumber}`
              )
            }
            variant='light'
          >
            <IconWand size={18} stroke={1.5} />
          </ActionIcon>
        )
      }
      withAsterisk
      {...uploadForm.getInputProps('title')}
    />
  )
}
