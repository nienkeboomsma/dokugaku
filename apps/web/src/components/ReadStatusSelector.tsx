import { Button, Combobox, useCombobox } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'
import { GQL_ReadStatus } from '@repo/graphql-types'

const readStatusValues = Object.values(GQL_ReadStatus)

const getDisplayValue = (value: string) => {
  const firstCharUppercase = value[0]?.toUpperCase() + value.slice(1)
  return firstCharUppercase.replaceAll('_', ' ')
}

export default function ReadStatusSelector({
  status,
  updateStatus,
}: {
  status: GQL_ReadStatus
  // eslint-disable-next-line no-unused-vars
  updateStatus: (status: GQL_ReadStatus) => void
}) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  })

  const options = readStatusValues.map((status) => (
    <Combobox.Option value={status} key={status}>
      {getDisplayValue(status)}
    </Combobox.Option>
  ))

  return (
    <Combobox
      onOptionSubmit={(status) => {
        updateStatus(status as GQL_ReadStatus)
        combobox.closeDropdown()
      }}
      store={combobox}
    >
      <Combobox.Target>
        <Button
          color={
            status === GQL_ReadStatus.Abandoned || status === GQL_ReadStatus.New
              ? 'gray'
              : undefined
          }
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
            status === GQL_ReadStatus.WantToRead ||
            status === GQL_ReadStatus.New
              ? 'outline'
              : status === GQL_ReadStatus.Reading
                ? 'light'
                : 'filled'
          }
        >
          {getDisplayValue(status)}
        </Button>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  )
}
