import { Button, Combobox, useCombobox } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'

import { ReadStatus } from '../types/Work'

const displayStatuses = ['Want to read', 'Reading', 'Read', 'Abandoned']

export default function ReadStatusSelector({
  value,
  setValue,
}: {
  value: ReadStatus
  // eslint-disable-next-line no-unused-vars
  setValue: (status: ReadStatus) => void
}) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  })

  const options = displayStatuses.map((status) => (
    <Combobox.Option value={status} key={status}>
      {status}
    </Combobox.Option>
  ))

  return (
    <Combobox
      onOptionSubmit={(value) => {
        const status = value.toLowerCase() as ReadStatus
        setValue(status)
        combobox.closeDropdown()
      }}
      store={combobox}
    >
      <Combobox.Target>
        <Button
          color={value === 'abandoned' ? 'gray' : undefined}
          onClick={() => combobox.toggleDropdown()}
          rightSection={<IconChevronDown size={14} />}
          styles={{
            root: { minWidth: '9rem', position: 'relative' },
            label: {
              position: 'relative',
              right: '0.5rem',
            },
            section: {
              position: 'absolute',
              right: '0.5rem',
            },
          }}
          type='button'
          variant={
            value === 'want to read'
              ? 'outline'
              : value === 'reading'
                ? 'light'
                : 'filled'
          }
        >
          {value[0]?.toUpperCase() + value.slice(1)}
        </Button>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  )
}
