import { ChangeEventHandler } from 'react'
import { Checkbox as MantineCheckbox } from '@mantine/core'

import classes from './Checkbox.module.css'

export default function Checkbox({
  id,
  indeterminate,
  isChildLevel,
  label,
  onChange,
  value,
}: {
  id?: string
  indeterminate?: boolean
  isChildLevel: boolean
  label: string
  onChange: ChangeEventHandler<HTMLInputElement>
  value: boolean
}) {
  return (
    <MantineCheckbox
      checked={value}
      classNames={classes}
      indeterminate={indeterminate}
      key={id}
      label={label}
      ml={isChildLevel ? 28 : ''}
      mt={isChildLevel ? 'xs' : ''}
      onChange={onChange}
      size='xs'
    />
  )
}
