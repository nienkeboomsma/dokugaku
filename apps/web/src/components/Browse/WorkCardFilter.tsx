import { Dispatch, SetStateAction } from 'react'
import { Switch } from '@mantine/core'

import classes from './WorkCardFilter.module.css'

export default function WorkCardFilter({
  showFinished,
  setShowFinished,
  showAbandoned,
  setShowAbandoned,
}: {
  showFinished: boolean
  setShowFinished: Dispatch<SetStateAction<boolean>>
  showAbandoned: boolean
  setShowAbandoned: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <div className={classes.filters}>
      <Switch
        checked={showFinished}
        label='Show finished'
        onChange={(event) => setShowFinished(event.currentTarget.checked)}
      />
      <Switch
        checked={showAbandoned}
        label='Show abandoned'
        onChange={(event) => setShowAbandoned(event.currentTarget.checked)}
      />
    </div>
  )
}
