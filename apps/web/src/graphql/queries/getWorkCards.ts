import { gql } from '@apollo/client'
import {
  type GQL_WorkCardsQueryVariables,
  type GQL_WorkCardsQuery,
} from '@repo/graphql-types'

import { getClient } from '../client/ApolloClient'
import { type WorkCardInfo } from '../../types/WorkCardInfo'
import { getPercentage } from '../../util/getPercentage'

const WORKCARDS = gql`
  query WorkCards($worksInput: WorkListInput) {
    seriesList {
      authors {
        id
        name
      }
      id
      learnableWords
      status
      title
      totalWords
      volumes {
        id
        numberInSeries
      }
    }
    workList(input: $worksInput) {
      authors {
        id
        name
      }
      id
      learnableWords
      status
      title
      totalWords
    }
  }
`

const variables: GQL_WorkCardsQueryVariables = {
  worksInput: {
    excludeVolumesInSeries: true,
  },
}

const getKnownVocab = (learnableWords: number, totalWords: number) => {
  const knownVocab = totalWords - learnableWords
  return getPercentage(knownVocab, totalWords, { round: 'down' })
}

export const getWorkCards = async () => {
  try {
    const { data } = await getClient().query<GQL_WorkCardsQuery>({
      query: WORKCARDS,
      variables,
      context: {
        fetchOptions: {
          cache: 'no-store',
        },
      },
    })

    const seriesCards: WorkCardInfo[] = data.seriesList.map((series) => {
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

    const workCards: WorkCardInfo[] = data.workList.map((work) => {
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

    return seriesCards
      .concat(workCards)
      .sort((cardA, cardB) => cardA.title.localeCompare(cardB.title))
  } catch {
    return []
  }
}
