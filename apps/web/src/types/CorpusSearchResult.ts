export type CorpusSearchResult = {
  id: string
  title: string
  allHits: {
    hitCount: number
    url: string
  }
  readHits: {
    hitCount: number
    url: string
  }
}
