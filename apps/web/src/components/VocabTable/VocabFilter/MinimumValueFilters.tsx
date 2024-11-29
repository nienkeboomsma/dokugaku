import { Dispatch, SetStateAction } from 'react'

import classes from './MinimumValueFilters.module.css'
import type { MinimumValues } from './VocabFilter'
import MinimumValueFilter from './MinimumValueFilter'

export default function MinimumValueFilters({
  minimumValues,
  setMinimumValues,
  showMinimumPageNumberFilter,
  showMinimumVolumeNumberFilter,
}: {
  minimumValues: MinimumValues
  setMinimumValues: Dispatch<SetStateAction<MinimumValues>>
  showMinimumPageNumberFilter: boolean
  showMinimumVolumeNumberFilter: boolean
}) {
  return (
    <div className={classes.container}>
      {showMinimumVolumeNumberFilter && (
        <MinimumValueFilter
          label='Minimum volume number'
          onChange={(value) =>
            setMinimumValues((prev) => {
              return { ...prev, volume: value }
            })
          }
          value={minimumValues.volume}
        />
      )}

      {showMinimumPageNumberFilter && (
        <MinimumValueFilter
          label='Minimum page number'
          onChange={(value) =>
            setMinimumValues((prev) => {
              return { ...prev, page: value }
            })
          }
          value={minimumValues.page}
        />
      )}

      <MinimumValueFilter
        label='Minimum frequency'
        onChange={(value) =>
          setMinimumValues((prev) => {
            return { ...prev, frequency: value }
          })
        }
        value={minimumValues.frequency}
      />
    </div>
  )
}
