const getIncrement = (currentPageNumber: number, twoPageLayout: boolean) => {
  const isCover = currentPageNumber === 1

  if (!twoPageLayout) return 1

  if (isCover) return 1

  return 2
}

export const getNewPageNumber = (
  currentPageNumber: number,
  maxPageNumber: number,
  direction: 'backward' | 'forward',
  twoPageLayout: boolean
) => {
  const increment = getIncrement(currentPageNumber, twoPageLayout)

  const newPageNumber =
    direction === 'backward'
      ? currentPageNumber - increment
      : currentPageNumber + increment

  if (newPageNumber < 1) return 1

  if (newPageNumber > maxPageNumber) {
    if (!twoPageLayout) return maxPageNumber

    const lastPageIsEven = maxPageNumber % 2 === 0

    if (lastPageIsEven) return maxPageNumber

    return maxPageNumber - 1
  }

  return newPageNumber
}

export const getLastPageNumber = (
  maxPageNumber: number,
  twoPageLayout: boolean
) => {
  const isUnevenPage = maxPageNumber % 2 === 1

  if (twoPageLayout && isUnevenPage) return maxPageNumber - 1

  return maxPageNumber
}

export const getShowTwoPages = (
  currentPageNumber: number,
  maxPageNumber: number,
  twoPageLayout: boolean
) => {
  const isCover = currentPageNumber === 1
  const isLastPage = currentPageNumber === maxPageNumber
  const isEvenPage = currentPageNumber % 2 === 0

  if (!twoPageLayout) return false
  if (isCover) return false
  if (isLastPage && isEvenPage) return false

  return true
}
