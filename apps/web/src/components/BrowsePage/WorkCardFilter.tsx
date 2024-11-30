import type { Dispatch, SetStateAction } from 'react'

import classes from './WorkCardFilter.module.css'
import type { StatusOptions } from './BrowsePage'
import CheckboxGroup from '../SearchFilterSort/CheckboxGroup'

export default function WorkCardFilter({
  setShowStatusOptions,
  showStatusOptions,
}: {
  setShowStatusOptions: Dispatch<SetStateAction<StatusOptions>>
  showStatusOptions: StatusOptions
}) {
  console.log('showStatusOptions', showStatusOptions)
  return (
    <div className={classes.filters}>
      <CheckboxGroup
        options={showStatusOptions}
        parentLabel='Show all statuses'
        setOptions={setShowStatusOptions}
      />
    </div>
  )
}
