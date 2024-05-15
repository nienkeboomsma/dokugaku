'use client'

import { useEffect, useState } from 'react'
import { Button, Textarea, Title } from '@mantine/core'
import { notifications } from '@mantine/notifications'

import classes from './KnownWordsUploadForm.module.css'

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
      const res = await fetch(
        // TODO: do this via env variable
        `http://localhost:3004/knownWords`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          // TODO: userId should be supplied via env variable and set in an auth header
          body: JSON.stringify({
            userId: '6e41e9fd-c813-40e9-91fd-c51e47efab42',
            words,
          }),
        }
      )
      const data = await res.json()

      if (data.error) {
        notifications.show({
          title: `Unable to process known words`,
          message: data.error,
        })
        return setLoading(false)
      }

      setWords('')
      notifications.show({
        title: `Known words uploaded successfully`,
        message: `Please check back in about ${Math.ceil(data.estimatedDurationInMin)} minutes`,
      })
      setLoading(false)
    } catch {
      notifications.show({
        title: 'Something went wrong',
        message: 'Please try again later',
      })
      setLoading(false)
    }
  }

  return (
    <>
      <Title order={3} size='h5'>
        Upload known words
      </Title>
      <form onSubmit={handleSubmit}>
        <Textarea
          aria-label='Known words'
          classNames={{ input: classes.input }}
          error={error}
          mt={12}
          onChange={(event) => setWords(event.currentTarget.value)}
          placeholder='A (white)space-separated or comma-separated list'
          value={words}
          w={400}
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
    </>
  )
}
