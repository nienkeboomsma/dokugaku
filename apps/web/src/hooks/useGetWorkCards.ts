import {
  GQL_WorkCardsQuery,
  GQL_WorkCardsQueryVariables,
} from '@repo/graphql-types'
import { useQuery } from '@apollo/client'

import { getPercentage } from '../util/getPercentage'
import { WORKCARDS } from '../graphql/queries/getWorkCards'
import { WorkCardInfo } from '../types/WorkCardInfo'

export const useGetWorkCards = () => {
  const getKnownVocab = (learnableWords: number, totalWords: number) => {
    const knownVocab = totalWords - learnableWords
    return getPercentage(knownVocab, totalWords, { round: 'down' })
  }

  const variables: GQL_WorkCardsQueryVariables = {
    worksInput: {
      excludeVolumesInSeries: true,
    },
  }

  const {
    data: rawData,
    error,
    loading,
  } = useQuery<GQL_WorkCardsQuery>(WORKCARDS, {
    variables,
  })

  if (!rawData) return { error, loading }

  const seriesCards: WorkCardInfo[] = rawData.seriesList.map((series) => {
    const sortedVolumes = series.volumes
      .filter(
        (volume): volume is { id: string; numberInSeries: number } =>
          !!volume.numberInSeries
      )
      .sort((volA, volB) => {
        return volA.numberInSeries - volB.numberInSeries
      })
    const [firstVolume] = sortedVolumes

    const { learnableWords, totalWords } = series
    const knownVocab = getKnownVocab(learnableWords, totalWords)

    return {
      authors: series.authors.map((author) => author.name),
      firstVolumeId: firstVolume?.id,
      id: series.id,
      knownVocab,
      numberOfVolumes: series.volumes.length,
      isSeries: true,
      status: series.status,
      title: series.title,
    }
  })

  const workCards: WorkCardInfo[] = rawData.workList.map((work) => {
    const { learnableWords, totalWords } = work
    const knownVocab = getKnownVocab(learnableWords, totalWords)

    return {
      authors: work.authors.map((author) => author.name),
      id: work.id,
      knownVocab,
      isSeries: false,
      status: work.status,
      title: work.title,
    }
  })

  const data = seriesCards
    .concat(workCards)
    // TODO: allow user to sort work cards alphabetically, by known words or by status
    .sort((cardA, cardB) => cardB.knownVocab - cardA.knownVocab)

  return { data, loading }
}
