import { gql } from '@apollo/client'
import {
  GQL_WordCountType,
  type GQL_WorkCardsQueryVariables,
  type GQL_WorkCardsQuery,
} from '@repo/graphql-types'

import { getClient } from './ApolloClient'
import { type WorkCardInfo } from '../types/WorkCardInfo'
import { getPercentage } from '../util/getPercentage'

const WORKCARDS = gql`
  query WorkCards(
    $learnableWordsInput: WordCountInput
    $totalWordsInput: WordCountInput
    $worksInput: WorkListInput
  ) {
    seriesList {
      authors {
        name
      }
      id
      status
      title
      totalWords: wordCount(input: $totalWordsInput)
      learnableWords: wordCount(input: $learnableWordsInput)
      volumes {
        id
        numberInSeries
      }
    }
    workList(input: $worksInput) {
      authors {
        name
      }
      id
      status
      title
      totalWords: wordCount(input: $totalWordsInput)
      learnableWords: wordCount(input: $learnableWordsInput)
    }
  }
`

const variables: GQL_WorkCardsQueryVariables = {
  learnableWordsInput: {
    type: GQL_WordCountType.Learnable,
  },
  totalWordsInput: {
    type: GQL_WordCountType.Total,
  },
  worksInput: {
    excludeVolumesInSeries: true,
  },
}

const getKnownVocab = (learnableWords: number, totalWords: number) => {
  const knownVocab = totalWords - learnableWords
  return Math.floor(getPercentage(knownVocab, totalWords))
}

export const getWorkCards = async () => {
  const { data } = await getClient().query<GQL_WorkCardsQuery>({
    query: WORKCARDS,
    variables,
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
      series: true,
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
      series: false,
      status: work.status,
      title: work.title,
    }
  })

  return seriesCards
    .concat(workCards)
    .sort((cardA, cardB) => cardA.title.localeCompare(cardB.title))
}
