import {
  ActionIcon,
  ActionIconVariant,
  FloatingPosition,
  MantineSize,
  Popover,
} from '@mantine/core'

import classes from './PopoverButton.module.css'
import React from 'react'

export default function PopoverButton({
  buttonIcon: ButtonIcon,
  buttonLabel,
  buttonSize,
  buttonVariant,
  children,
  iconSize,
  position,
  strokeSize,
}: {
  buttonIcon: React.ElementType
  buttonLabel: string
  buttonSize?: MantineSize | string | number
  buttonVariant?: ActionIconVariant
  children: React.ReactNode
  iconSize?: MantineSize | string | number
  position?: FloatingPosition
  strokeSize?: number
}) {
  return (
    <Popover
      classNames={{ dropdown: classes.dropdown }}
      position={position}
      shadow="md"
      trapFocus
      withArrow
    >
      <Popover.Target>
        <ActionIcon
          aria-label={buttonLabel}
          size={buttonSize}
          variant={buttonVariant}
        >
          <ButtonIcon size={iconSize ?? 18} stroke={strokeSize ?? 1.5} />
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown>{children}</Popover.Dropdown>
    </Popover>
  )
}
