import { Dispatch, SetStateAction } from 'react'
import { CloseButton, TextInput } from '@mantine/core'
import { IconSearch, IconX } from '@tabler/icons-react'

import classes from './Search.module.css'

export default function Search({
  searchValue,
  setSearchValue,
}: {
  searchValue: string
  setSearchValue: Dispatch<SetStateAction<string>>
}) {
  return (
    <TextInput
      classNames={{ root: classes.searchBar, input: classes.searchBarText }}
      leftSectionPointerEvents='none'
      leftSection={<IconSearch size={16} stroke={1.5} />}
      onChange={({ target }) => setSearchValue(target.value)}
      placeholder='Search'
      rightSection={
        searchValue && (
          <CloseButton
            icon={
              <IconX
                size={16}
                onClick={() => setSearchValue('')}
                stroke={1.5}
              />
            }
          />
        )
      }
      size='xs'
      value={searchValue}
    />
  )
}
