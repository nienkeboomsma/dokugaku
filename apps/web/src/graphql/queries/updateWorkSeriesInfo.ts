import { gql } from '@apollo/client'

export const DELETE_SERIES = gql`
  mutation DeleteSeries($input: DeleteSeriesInput!) {
    deleteSeries(input: $input) {
      success
    }
  }
`

export const DELETE_WORK = gql`
  mutation DeleteWork($input: DeleteWorkInput!) {
    deleteWork(input: $input) {
      success
    }
  }
`
