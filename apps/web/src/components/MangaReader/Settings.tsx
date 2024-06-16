import type { Dispatch, SetStateAction } from 'react'
import { ActionIcon } from '@mantine/core'
import {
  IconBoxMultiple2,
  IconMaximize,
  IconMinimize,
  IconSquareNumber1,
} from '@tabler/icons-react'

import classes from './Settings.module.css'

export default function Settings({
  fullscreen,
  setTwoPageLayout,
  toggleFullscreen,
  twoPageLayout,
}: {
  fullscreen: boolean
  setTwoPageLayout: Dispatch<SetStateAction<boolean>>
  toggleFullscreen: () => void
  twoPageLayout: boolean
}) {
  return (
    <div className={classes.container}>
      {twoPageLayout ? (
        <ActionIcon
          aria-label='Display one page'
          onClick={() => setTwoPageLayout(false)}
          size='2rem'
          variant='subtle'
        >
          <IconSquareNumber1 size='75%' stroke={1.7} />
        </ActionIcon>
      ) : (
        <ActionIcon
          aria-label='Display two pages'
          onClick={() => setTwoPageLayout(true)}
          size='2rem'
          variant='subtle'
        >
          <IconBoxMultiple2 size='75%' stroke={1.7} />
        </ActionIcon>
      )}

      <ActionIcon
        aria-label='Toggle fullscreen mode'
        onClick={toggleFullscreen}
        size='2rem'
        variant='subtle'
      >
        {fullscreen ? (
          <IconMinimize size='90%' stroke={1.6} />
        ) : (
          <IconMaximize size='80%' stroke={1.9} />
        )}
      </ActionIcon>
    </div>
  )
}
