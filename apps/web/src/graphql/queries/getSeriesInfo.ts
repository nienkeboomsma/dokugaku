import { gql } from '@apollo/client'

export const SERIES_INFO = gql`
  query SeriesInfo($seriesInput: SeriesInput!) {
    series(input: $seriesInput) {
      authors {
        id
        name
      }
      id
      status
      title
      volumes {
        id
        maxProgress
        progress
        status
        volumeNumber: numberInSeries
      }
    }
  }
`
