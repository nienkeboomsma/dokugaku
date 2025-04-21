'use client'

import { useEffect, useState } from 'react'
import { Button, Fieldset, Textarea } from '@mantine/core'
import { notifications } from '@mantine/notifications'

import classes from './KnownWordsUploadForm.module.css'
import { queryWorkProcessor } from '../../util/queryWorkprocessor'

export default function KnownWordsUploadForm() {
  const [words, setWords] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (words && error) {
      setError('')
    }
  }, [words])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!words) {
      return setError('Please supply a list of known words')
    }

    setLoading(true)

    try {
      const data = await queryWorkProcessor('knownWords', { words })

      if (!data || data.error) throw Error

      setWords('')
      notifications.show({
        title: `Known words uploaded successfully`,
        message: (
          <span>
            Processing can be monitored in the <code>work-processor</code> logs
          </span>
        ),
      })
    } catch {
      notifications.show({
        title: 'Unable to upload known words',
        message: '(Re)start all containers and try again',
        color: 'red',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Fieldset className={classes.container} legend='Upload known words'>
      <form onSubmit={handleSubmit}>
        <Textarea
          aria-label='Known words'
          classNames={{ input: classes.input }}
          error={error}
          onChange={(event) => setWords(event.currentTarget.value)}
          placeholder='A (white)space-separated or comma-separated list'
          value={words}
          withAsterisk
        />
        <Button
          mt={12}
          loaderProps={{ type: 'dots' }}
          loading={loading}
          type='submit'
          variant='filled'
        >
          Upload
        </Button>
      </form>
    </Fieldset>
  )
}
