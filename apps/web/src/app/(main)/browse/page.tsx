'use client'

import { useGetWorkCards } from '../../../hooks/useGetWorkCards'
import Browse from '../../../components/Browse/Browse'

// TODO: if necessary: cache the knownVocab value
// TODO: add pagination

export default function BrowsePage() {
  const { data, error, loading } = useGetWorkCards()

  return (
    <>
      <title>Browse</title>
      <Browse data={data} error={error} loading={loading} />
    </>
  )
}
