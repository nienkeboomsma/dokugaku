import { type WorkCardInfo } from '../../types/WorkCardInfo'
import type { StatusOptions } from './BrowsePage'
import { normalise } from '../../util/normaliseString'

export default function filterCards(
  card: WorkCardInfo,
  debouncedSearchValue: string,
  showStatusOptions: StatusOptions
) {
  const { title, authors, status = '' } = card

  if (
    debouncedSearchValue !== '' &&
    !normalise(title).includes(normalise(debouncedSearchValue)) &&
    !authors.some((author) =>
      normalise(author).includes(normalise(debouncedSearchValue))
    ) &&
    !normalise(status).includes(normalise(debouncedSearchValue))
  ) {
    return false
  }

  const readStatuses = Object.entries(showStatusOptions)

  for (const [optionStatus, options] of readStatuses) {
    if (status === optionStatus && !options.checked) {
      return false
    }
  }

  return true
}
