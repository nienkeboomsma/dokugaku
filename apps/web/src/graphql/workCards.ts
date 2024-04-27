import { gql } from '@apollo/client'
import {
  GQL_WordCountType,
  type GQL_WorkCardsQueryVariables,
  type GQL_WorkCardsQuery,
} from '@repo/graphql-types'

import { getClient } from './ApolloClient'
import { getPercentage } from '../util/getPercentage'
import { isNumber } from '../types/utility'
import { WorkCardInfo } from '../types/WorkCardInfo'

const WORKCARDS = gql`
  query WorkCards(
    $learnableWordsInput: WordCountInput
    $seriesInput: SeriesListInput
    $totalWordsInput: WordCountInput
    $worksInput: WorkListInput
  ) {
    seriesList(input: $seriesInput) {
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

// TODO: this should be centrally supplied
const userId = '6e41e9fd-c813-40e9-91fd-c51e47efab42'

const variables: GQL_WorkCardsQueryVariables = {
  learnableWordsInput: {
    type: GQL_WordCountType.Learnable,
    userId,
  },
  seriesInput: {
    userId,
  },
  totalWordsInput: {
    type: GQL_WordCountType.Total,
    userId,
  },
  worksInput: {
    excludeVolumesInSeries: true,
    userId,
  },
}

const getKnownVocab = (learnableWords: any, totalWords: any) => {
  return isNumber(learnableWords) && isNumber(totalWords) && totalWords > 0
    ? Math.floor(getPercentage(totalWords, learnableWords))
    : undefined
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
      status: series.status ?? undefined,
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
      status: work.status ?? undefined,
      title: work.title,
    }
  })

  return seriesCards
    .concat(workCards)
    .sort((cardA, cardB) => cardA.title.localeCompare(cardB.title))
}
