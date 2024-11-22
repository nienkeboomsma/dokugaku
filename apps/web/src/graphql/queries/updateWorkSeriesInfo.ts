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

export const UPDATE_SERIES = gql`
  mutation UpdateSeriesReadStatus($input: UpdateSeriesReadStatusInput!) {
    updateSeriesReadStatus(input: $input) {
      status
      success
    }
  }
`

export const UPDATE_WORK = gql`
  mutation UpdateWorkReadStatus($input: UpdateWorkReadStatusInput!) {
    updateWorkReadStatus(input: $input) {
      status
      success
    }
  }
`
