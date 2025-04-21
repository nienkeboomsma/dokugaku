export function getHits(searchParams: {
  [key: string]: string | string[] | undefined
}): number[] {
  if (!searchParams.hits) {
    return []
  }

  let hits: string[] = []

  if (typeof searchParams.hits === 'string') {
    hits = [searchParams.hits]
  }

  hits = hits.flatMap((hit) => hit.split(',')).sort()
  const hitNumbers = hits
    .map((hit) => Number(hit))
    .filter((hit) => !Number.isNaN(hit))
    .sort()

  return hitNumbers
}
