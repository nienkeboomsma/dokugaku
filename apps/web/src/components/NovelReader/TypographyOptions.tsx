import type { Dispatch, SetStateAction } from 'react'
import { Slider, Text } from '@mantine/core'

import classes from './TypographyOptions.module.css'

export default function TypographyOptions({
  fontSizeMultiplier,
  lineHeightMultiplier,
  setFontSizeMultiplier,
  setLineHeightMultiplier,
}: {
  fontSizeMultiplier: number
  lineHeightMultiplier: number
  setFontSizeMultiplier: Dispatch<SetStateAction<number>>
  setLineHeightMultiplier: Dispatch<SetStateAction<number>>
}) {
  return (
    <div className={classes.container}>
      <Text fw={500} lh={1} size='sm'>
        Font size
      </Text>
      <Slider
        classNames={classes}
        defaultValue={1}
        label={null}
        min={0.7}
        max={1.3}
        onChange={setFontSizeMultiplier}
        step={0.05}
        value={fontSizeMultiplier}
        w={200}
      />
      <Text fw={500} lh={1} size='sm'>
        Line height
      </Text>
      <Slider
        classNames={classes}
        defaultValue={1}
        label={null}
        min={0.6}
        max={2}
        onChange={setLineHeightMultiplier}
        step={0.1}
        value={lineHeightMultiplier}
        w={200}
      />
    </div>
  )
}
