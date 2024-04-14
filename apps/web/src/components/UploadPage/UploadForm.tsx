import { Button } from '@mantine/core'

import classes from './UploadForm.module.css'
import { useUploadForm } from '../../hooks/useUploadForm'
import SeriesInput from './SeriesInput'
import VolumeNumberInput from './VolumeNumberInput'
import TitleInput from './TitleInput'
import AuthorsInput from './AuthorsInput'
import MokuroInput from './MokuroInput'
import CoverInput from './CoverInput'
import FilesInput from './FilesInput'

// TODO: replace with API calls
const existingAuthors = [
  '臼井 儀人',
  '赤川 次郎',
  'あらゐ けいいち',
  'オオイシ ナホ',
]
const existingSeries = [
  'クレヨンしんちゃん',
  'よつばと！',
  '日常',
  '古見さんは、コミュ症です。',
]

export default function NovelForm({ type }: { type: 'manga' | 'novel' }) {
  const { uploadForm, submitHandler } = useUploadForm(type)

  return (
    <form
      className={classes.form}
      onSubmit={uploadForm.onSubmit(submitHandler)}
    >
      <SeriesInput existingSeries={existingSeries} uploadForm={uploadForm} />
      <VolumeNumberInput uploadForm={uploadForm} />
      <TitleInput uploadForm={uploadForm} />
      <AuthorsInput existingAuthors={existingAuthors} uploadForm={uploadForm} />

      {type === 'manga' && <MokuroInput uploadForm={uploadForm} />}
      {type === 'novel' && <CoverInput uploadForm={uploadForm} />}

      <FilesInput type={type} uploadForm={uploadForm} />

      <Button mt={20} type='submit' variant='filled'>
        Upload
      </Button>
    </form>
  )
}
