import { gql } from '@apollo/client'

export const CURRENT_WORKS = gql`
  query CurrentWorks($input: WorkListInput) {
    workList(input: $input) {
      id
      maxProgress
      progress
    }
  }
`
