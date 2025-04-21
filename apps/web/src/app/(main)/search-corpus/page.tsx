import { Metadata } from 'next'

import SearchCorpusPage from '../../../components/SearchCorpusPage/SearchCorpusPage'

export const metadata: Metadata = {
  title: 'Search corpus',
}

export default async function SearchCorpus() {
  return <SearchCorpusPage />
}
