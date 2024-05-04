import { TagsInput } from '@mantine/core'

import { type ExistingAuthors } from '../../types/ExistingAuthors'
import { type UploadForm } from '../../hooks/useUploadForm'
import AutofillButton from './AutofillButton'

export default function AuthorsInput({
  existingAuthors,
  findAuthorsBySeriesTitle,
  uploadForm,
}: {
  existingAuthors: ExistingAuthors
  // eslint-disable-next-line no-unused-vars
  findAuthorsBySeriesTitle: (seriesTitle: string) => string[] | []
  uploadForm: UploadForm
}) {
  const showAutofillButton = !!(
    !uploadForm.values.authors.length &&
    uploadForm.values.series &&
    findAuthorsBySeriesTitle(uploadForm.values.series).length
  )

  const autofillAction = () =>
    uploadForm.setFieldValue(
      'authors',
      findAuthorsBySeriesTitle(uploadForm.values.series)
    )

  return (
    <TagsInput
      label='Author(s)'
      data={[...existingAuthors]}
      rightSection={
        <AutofillButton
          ariaLabel='Autofill authors'
          onClick={autofillAction}
          showButton={showAutofillButton}
        />
      }
      withAsterisk
      {...uploadForm.getInputProps('authors')}
    />
  )
}
