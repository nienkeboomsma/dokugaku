import { memo } from 'react'
import { Badge, useMantineTheme } from '@mantine/core'

import classes from './JLPTLabel.module.css'
import { JLPT } from '../../types/Word'
import { Color, getOffsetThemeColor } from '../../util/getOffsetThemeColor'

function JLPTLabel({ jlpt }: { jlpt: JLPT }) {
  const theme = useMantineTheme()

  const colorsMap: Record<JLPT, string> = {
    N5: getOffsetThemeColor(theme.primaryColor as Color, -2),
    N4: getOffsetThemeColor(theme.primaryColor as Color, -1),
    N3: getOffsetThemeColor(theme.primaryColor as Color, 0),
    N2: getOffsetThemeColor(theme.primaryColor as Color, 1),
    N1: getOffsetThemeColor(theme.primaryColor as Color, 2),
  }

  return (
    <Badge
      classNames={classes}
      color={colorsMap[jlpt]}
      p={4}
      radius="xs"
      size="xs"
      variant="outline"
    >
      {jlpt}
    </Badge>
  )
}

export default memo(JLPTLabel)
