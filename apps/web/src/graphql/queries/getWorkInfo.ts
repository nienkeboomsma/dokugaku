import { gql } from '@apollo/client'

export const WORK_INFO = gql`
  query WorkInfo($workInput: WorkInput!) {
    work(input: $workInput) {
      authors {
        id
        name
      }
      id
      maxProgress
      progress
      series {
        id
        title
        volumes {
          id
          volumeNumber: numberInSeries
        }
      }
      status
      title
      type
      volumeNumber: numberInSeries
    }
  }
`
