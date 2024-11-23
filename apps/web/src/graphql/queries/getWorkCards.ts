import { gql } from '@apollo/client'

export const WORKCARDS = gql`
  query WorkCards($worksInput: WorkListInput) {
    seriesList {
      authors {
        id
        name
      }
      id
      learnableWords
      status
      title
      totalWords
      volumes {
        id
        numberInSeries
      }
    }
    workList(input: $worksInput) {
      authors {
        id
        name
      }
      id
      learnableWords
      status
      title
      totalWords
    }
  }
`
