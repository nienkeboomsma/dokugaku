import { TagsInput } from '@mantine/core'

import { type ExistingAuthors } from '../../types/ExistingAuthors'
import type { WorkUploadForm } from '../../hooks/useWorkUploadForm'
import AutofillButton from './AutofillButton'

export default function AuthorsInput({
  existingAuthors,
  findAuthorsBySeriesTitle,
  form,
}: {
  existingAuthors: ExistingAuthors
  // eslint-disable-next-line no-unused-vars
  findAuthorsBySeriesTitle: (seriesTitle: string) => string[] | []
  form: WorkUploadForm
}) {
  const showAutofillButton = !!(
    !form.values.authors.length &&
    form.values.series &&
    findAuthorsBySeriesTitle(form.values.series).length
  )

  const autofillAction = () =>
    form.setFieldValue('authors', findAuthorsBySeriesTitle(form.values.series))

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
      {...form.getInputProps('authors')}
    />
  )
}
