import { gql } from '@apollo/client'
import { type GQL_ExistingSeriesQuery } from '@repo/graphql-types'

import { getClient } from '../client/ApolloClient'
import { getLowestMissingNumber } from '../../util/getLowestMissingNumber'
import { isNumber } from '../../types/utility'
import { ExistingSeries } from '../../types/ExistingSeries'

const FORM_EXISTING_SERIES = gql`
  query ExistingSeries {
    seriesList {
      id
      title
      volumes {
        authors {
          id
          name
        }
        id
        numberInSeries
        type
      }
    }
  }
`
export const getExistingSeries = async (): Promise<ExistingSeries> => {
  try {
    const { data } = await getClient().query<GQL_ExistingSeriesQuery>({
      query: FORM_EXISTING_SERIES,
    })

    const seriesInfo = data.seriesList.map((series) => {
      const authors = series.volumes.flatMap((volume) =>
        volume.authors.map((author) => author.name)
      )
      const uniqueAuthors = new Set(authors)

      const workTypes = series.volumes.map((volume) => volume.type)
      const uniqueWorkTypes = new Set(workTypes)

      const volumeNumbers = series.volumes
        .map((volume) => volume.numberInSeries)
        .filter(isNumber)

      const nextVolumeNumber = getLowestMissingNumber(volumeNumbers)

      const seriesInfo = {
        authors: uniqueAuthors,
        nextVolumeNumber,
        title: series.title,
        volumeNumbers,
        workTypes: uniqueWorkTypes,
      }
      return seriesInfo
    })

    return seriesInfo.sort((seriesA, seriesB) =>
      seriesA.title.localeCompare(seriesB.title)
    )
  } catch {
    return []
  }
}
