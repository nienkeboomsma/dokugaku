/* eslint-disable no-unused-vars */
import { Radio, Stack } from '@mantine/core'
import { Dispatch, SetStateAction } from 'react'

export enum ListType {
  Frequency = 'frequency',
  Glossary = 'glossary',
}

export default function VocabSort({
  listType,
  setListType,
}: {
  listType: ListType
  setListType: Dispatch<SetStateAction<ListType>>
}) {
  return (
    <Radio.Group
      aria-label='List style'
      name='listType'
      onChange={setListType as Dispatch<SetStateAction<string>>}
      value={listType}
    >
      <Stack>
        <Radio value={ListType.Frequency} label='Frequency list' />
        <Radio value={ListType.Glossary} label='Glossary' />
      </Stack>
    </Radio.Group>
  )
}
