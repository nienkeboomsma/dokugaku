'use client'

import { useGetWorkCards } from '../../../hooks/useGetWorkCards'
import Browse from '../../../components/Browse/Browse'
import BrowseSkeleton from '../../../components/Browse/BrowseSkeleton'

// TODO: if necessary: cache the knownVocab value
// TODO: add pagination

export default function BrowsePage() {
  const { data, error, loading } = useGetWorkCards()

  // TODO: add a proper error page
  if (error) return 'Oops'

  if (!data || loading) return <BrowseSkeleton />

  return <Browse allWorkCards={data} />
}
