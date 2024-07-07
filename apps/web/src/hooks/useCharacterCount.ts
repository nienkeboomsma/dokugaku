import { useTextSelection } from '@mantine/hooks'

export const useCharacterCount = () => {
  const selection = useTextSelection()
  const charCount = selection
    ? selection.toString().replaceAll(/\s/g, '').length
    : 0

  return charCount
}
