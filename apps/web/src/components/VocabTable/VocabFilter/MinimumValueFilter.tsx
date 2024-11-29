import { NumberInput, Text } from '@mantine/core'

export default function MinimumValueFilter({
  label,
  onChange,
  value,
}: {
  label: string
  onChange: (value: number) => void
  value: number
}) {
  return (
    <div>
      <Text fw={500} lh={1} mb='xs' mt='-0.25' size='sm'>
        {label}
      </Text>
      <NumberInput
        min={1}
        onChange={(value) => onChange(Number(value))}
        size='xs'
        value={value}
      />
    </div>
  )
}
