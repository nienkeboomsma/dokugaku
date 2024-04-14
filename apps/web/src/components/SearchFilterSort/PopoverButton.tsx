import { ActionIcon, Popover } from '@mantine/core'

import classes from './PopoverButton.module.css'
import React from 'react'

export default function PopoverButton({
  buttonIcon: ButtonIcon,
  buttonLabel,
  children,
}: {
  buttonIcon: React.ElementType
  buttonLabel: string
  children: React.ReactNode
}) {
  return (
    <Popover
      classNames={{ dropdown: classes.dropdown }}
      position='bottom'
      shadow='md'
      trapFocus
      withArrow
    >
      <Popover.Target>
        <ActionIcon aria-label={buttonLabel} size='input-xs' variant='filled'>
          <ButtonIcon size='60%' stroke={1.5} />
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown>{children}</Popover.Dropdown>
    </Popover>
  )
}
