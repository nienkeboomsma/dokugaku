import { gql } from '@apollo/client'
import { type GQL_UploadFormExistingSeriesQuery } from '@repo/graphql-types'

import { getClient } from './ApolloClient'
import { getLowestMissingNumber } from '../util/getLowestMissingNumber'
import { isNumber } from '../types/utility'

const UPLOAD_FORM_EXISTING_SERIES = gql`
  query UploadFormExistingSeries {
    seriesList {
      title
      volumes {
        authors {
          name
        }
        numberInSeries
        type
      }
    }
  }
`
export const getUploadFormExistingSeries = async () => {
  try {
    const { data } = await getClient().query<GQL_UploadFormExistingSeriesQuery>(
      {
        query: UPLOAD_FORM_EXISTING_SERIES,
      }
    )

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

    return seriesInfo
  } catch {
    return []
  }
}
