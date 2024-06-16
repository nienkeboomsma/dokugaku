import { gql } from '@apollo/client'

export const WORK_PROGRESS = gql`
  query WorkProgress($workInput: WorkInput!) {
    work(input: $workInput) {
      maxProgress
      progress
    }
  }
`
