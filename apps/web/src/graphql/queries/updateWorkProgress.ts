import { gql } from '@apollo/client'

export const UPDATE_WORK_PROGRESS = gql`
  mutation UpdateWorkProgress($input: UpdateWorkProgressInput!) {
    updateWorkProgress(input: $input) {
      progress
      success
    }
  }
`
