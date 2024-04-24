import { useEffect } from 'react'
import { useForm } from '@mantine/form'

export type FormType = 'manga' | 'novel'

export type FormValues = {
  series: string
  volumeNumber?: string
  title: string
  authors: string[]
  mokuro?: boolean
  cover?: File
  files: File[]
}
const getInitialValues = (type: FormType) => {
  const commonValues = {
    series: '',
    volumeNumber: '',
    title: '',
    authors: [],
    files: [],
  }

  if (type === 'manga') return { ...commonValues, mokuro: false }
  if (type === 'novel') return { ...commonValues, cover: undefined }
}
const volumeNumberValidator = (
  value: FormValues['volumeNumber'],
  values: FormValues
) => {
  if (values.series && !value) {
    return 'Please supply a volume number'
  }
  if (value && !/[0-9]/.test(value)) {
    return 'Please supply an integer'
  }
  return null
}

const titleValidator = (value: FormValues['title']) =>
  !value ? 'Please supply a title' : null

const authorsValidator = (value: FormValues['authors']) =>
  value.length === 0 ? 'Please supply at least one author' : null

const mangaFilesValidator = (value: FormValues['files']) => {
  return value.length === 0 ? `Please supply the manga's image files` : null
}

const novelFilesValidator = (value: FormValues['files']) => {
  return value.length === 0 ? `Please supply the novel's text files` : null
}

const coverValidator = (value: FormValues['cover']) => {
  return !value ? 'Please supply a cover image' : null
}

const getValidators = (type: FormType) => {
  const commonValidators = {
    volumeNumber: volumeNumberValidator,
    title: titleValidator,
    authors: authorsValidator,
  }

  if (type === 'manga')
    return {
      ...commonValidators,
      files: mangaFilesValidator,
    }
  if (type === 'novel')
    return {
      ...commonValidators,
      files: novelFilesValidator,
      cover: coverValidator,
    }
}

export function useUploadForm(type: FormType) {
  const uploadForm = useForm<FormValues>({
    initialValues: getInitialValues(type),
    validate: getValidators(type),
  })

  useEffect(() => {
    if (uploadForm.values.series === '') {
      uploadForm.setFieldValue('volumeNumber', '')
    }
  }, [uploadForm.values.series])

  // TODO: add magic autofill button for author name if a pre-existing series is selected

  const sendFormData = async (
    values: FormValues,
    event: React.FormEvent<HTMLFormElement> | undefined
  ) => {
    if (!event) return
    event.preventDefault()

    const formData = new FormData()

    formData.append('series', values.series)
    formData.append('volumeNumber', values.volumeNumber ?? '')
    formData.append('title', values.title)
    values.authors.forEach((author) => {
      formData.append('authors', author)
    })
    values.files.forEach((file) => formData.append('files', file))

    if (type === 'manga') {
      formData.append('mokuro', values.mokuro?.toString() ?? 'false')
    }
    if (type === 'novel') {
      formData.append('cover', values.cover ?? '')
    }

    // TODO: the id should be supplied centrally via Docker Compose
    formData.append('userId', '6e41e9fd-c813-40e9-91fd-c51e47efab42')

    const res = await fetch(
      `http://localhost:3004/process${type === 'manga' ? 'Manga' : 'Novel'}`,
      {
        method: 'POST',
        body: formData,
      }
    )
    console.log(await res.json())
  }

  return { uploadForm, submitHandler: sendFormData }
}
