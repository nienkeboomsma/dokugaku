import { Dispatch, SetStateAction } from 'react'

import classes from './CheckboxGroup.module.css'
import Checkbox from './Checkbox'
import { Option } from './VocabFilter'

export type Options = Record<string, Option>

export default function CheckboxGroup<T extends Options>({
  options,
  setOptions,
}: {
  options: T
  setOptions: Dispatch<SetStateAction<T>>
}) {
  const allChecked = Object.values(options).every((option) => option.checked)
  const indeterminate =
    !allChecked && Object.values(options).some((option) => option.checked)

  const items = Object.entries(options).map(([key, value]) => (
    <Checkbox
      isChildLevel
      id={key}
      label={value.label ?? key}
      onChange={() =>
        setOptions((prev) => {
          return {
            ...prev,
            [key]: {
              ...value,
              checked: !value.checked,
            },
          }
        })
      }
      value={value.checked}
    />
  ))

  return (
    <div className={classes.container}>
      <Checkbox
        isChildLevel={false}
        value={allChecked}
        indeterminate={indeterminate}
        label='Show all'
        onChange={() =>
          setOptions((prev) => {
            const nextValue = { ...prev }
            const keys: Array<keyof T> = Object.keys(prev)
            keys.forEach((key) => {
              nextValue[key] = { ...prev[key], checked: !allChecked }
            })
            return nextValue
          })
        }
      />
      {items}
    </div>
  )
}
