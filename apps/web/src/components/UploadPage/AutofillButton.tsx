import { ActionIcon } from '@mantine/core'
import { IconWand } from '@tabler/icons-react'

export default function AutofillButton({
  ariaLabel,
  onClick,
  showButton,
}: {
  ariaLabel: string
  onClick: () => void
  showButton: boolean
}) {
  return (
    showButton && (
      <ActionIcon aria-label={ariaLabel} onClick={onClick} variant='light'>
        <IconWand size={18} stroke={1.5} />
      </ActionIcon>
    )
  )
}
