import { gql } from '@apollo/client'

export const UPDATE_SERIES_READ_STATUS = gql`
  mutation UpdateSeriesReadStatus($input: UpdateSeriesReadStatusInput!) {
    updateSeriesReadStatus(input: $input) {
      status
      success
    }
  }
`

export const UPDATE_WORK_READ_STATUS = gql`
  mutation UpdateWorkReadStatus($input: UpdateWorkReadStatusInput!) {
    updateWorkReadStatus(input: $input) {
      status
      success
    }
  }
`
