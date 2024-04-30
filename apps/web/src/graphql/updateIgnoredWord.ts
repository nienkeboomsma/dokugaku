import { gql } from '@apollo/client'

export const UPDATE_IGNORED_WORD = gql`
  mutation UpdateIgnoredWord($input: UpdateIgnoredWordInput!) {
    updateIgnoredWord(input: $input) {
      success
    }
  }
`
