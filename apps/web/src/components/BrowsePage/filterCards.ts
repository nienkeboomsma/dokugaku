import { type WorkCardInfo } from '../../types/WorkCardInfo'
import { normalise } from '../../util/normaliseString'

export default function filterCards(
  card: WorkCardInfo,
  debouncedSearchValue: string,
  showFinished: boolean,
  showAbandoned: boolean
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

  if (!showFinished && status === 'read') {
    return false
  }

  if (!showAbandoned && status === 'abandoned') {
    return false
  }

  return true
}
