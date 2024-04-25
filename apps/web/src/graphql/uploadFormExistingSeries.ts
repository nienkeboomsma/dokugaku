import { gql } from '@apollo/client'
import { type GQL_UploadFormExistingSeriesQuery } from '@repo/graphql-types'

import { getClient } from './ApolloClient'

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
  const { data } = await getClient().query<GQL_UploadFormExistingSeriesQuery>({
    query: UPLOAD_FORM_EXISTING_SERIES,
  })

  const seriesInfo = data.seriesList.map((series) => {
    const authors = series.volumes.flatMap((volume) =>
      volume.authors.map((author) => author.name)
    )
    const uniqueAuthors = [...new Set(authors)]

    const types = series.volumes.map((volume) => volume.type)
    const uniqueTypes = [...new Set(types)]

    const volumeNumbers = series.volumes
      .map((volume) => volume.numberInSeries)
      .sort()

    let nextVolumeNumber = 1
    for (let number of volumeNumbers) {
      if (number === nextVolumeNumber) {
        nextVolumeNumber++
      }
    }

    const seriesInfo = {
      authors: uniqueAuthors,
      nextVolumeNumber,
      title: series.title,
      types: uniqueTypes,
    }
    return seriesInfo
  })

  return seriesInfo
}
