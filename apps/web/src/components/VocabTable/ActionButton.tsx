import { ActionIcon, MantineColor, Tooltip } from '@mantine/core'

export default function ActionButton({
  icon: Icon,
  iconColor,
  onClick,
  tooltipLabel,
}: {
  icon: React.ElementType
  iconColor: MantineColor
  onClick: () => void
  tooltipLabel: string
}) {
  return (
    <Tooltip label={tooltipLabel}>
      <ActionIcon
        color={iconColor}
        onClick={onClick}
        size='sm'
        variant='subtle'
      >
        <Icon size={16} stroke={1.5} />
      </ActionIcon>
    </Tooltip>
  )
}
