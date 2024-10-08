import { useEffect } from 'react'
import { type UseFormReturnType, useForm } from '@mantine/form'
import { GQL_WorkType } from '@repo/graphql-types'

import getHost from '../util/getHost'

export type FormValues = {
  series: string
  volumeNumber?: string
  title: string
  authors: string[]
  mokuro?: boolean
  cover?: File
  files: File[]
}

export type WorkUploadForm = UseFormReturnType<FormValues>
const getInitialValues = (type: GQL_WorkType) => {
  const commonValues = {
    series: '',
    volumeNumber: '',
    title: '',
    authors: [],
    files: [],
  }

  if (type === GQL_WorkType.Manga) return { ...commonValues, mokuro: false }
  if (type === GQL_WorkType.Novel) return { ...commonValues, cover: undefined }
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

// TODO: if mokuro === true, manga files should contain a json for each img
const mangaFilesValidator = (value: FormValues['files']) => {
  return value.length === 0 ? `Please supply the manga's image files` : null
}

const novelFilesValidator = (value: FormValues['files']) => {
  return value.length === 0 ? `Please supply the novel's text files` : null
}

const coverValidator = (value: FormValues['cover']) => {
  return !value ? 'Please supply a cover image' : null
}

const getValidators = (type: GQL_WorkType) => {
  const commonValidators = {
    volumeNumber: volumeNumberValidator,
    title: titleValidator,
    authors: authorsValidator,
  }

  if (type === GQL_WorkType.Manga)
    return {
      ...commonValidators,
      files: mangaFilesValidator,
    }
  if (type === GQL_WorkType.Novel)
    return {
      ...commonValidators,
      files: novelFilesValidator,
      cover: coverValidator,
    }
}

export default function useWorkUploadForm(type: GQL_WorkType) {
  const form = useForm<FormValues>({
    initialValues: getInitialValues(type),
    validate: getValidators(type),
  })

  useEffect(() => {
    if (form.values.series === '') {
      form.setFieldValue('volumeNumber', '')
    }
  }, [form.values.series])

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

    if (type === GQL_WorkType.Manga) {
      formData.append('mokuro', values.mokuro?.toString() ?? 'false')
    }
    if (type === GQL_WorkType.Novel) {
      formData.append('cover', values.cover ?? '')
    }

    // TODO: userId should be supplied via env variable and set in an auth header
    formData.append('userId', '6e41e9fd-c813-40e9-91fd-c51e47efab42')

    const host = getHost()
    const port = process.env.NEXT_PUBLIC_WORK_PROCESSOR_PORT

    const res = await fetch(`http://${host}:${port}/process${type}`, {
      method: 'POST',
      body: formData,
    })
    const data = await res.json()
    return data
  }

  return { form, sendFormData }
}
