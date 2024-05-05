import { gql } from '@apollo/client'
import { type GQL_ExistingAuthorsQuery } from '@repo/graphql-types'

import { getClient } from '../client/ApolloClient'
import { ExistingAuthors } from '../../types/ExistingAuthors'

const EXISTING_AUTHORS = gql`
  query ExistingAuthors {
    authorList {
      id
      name
    }
  }
`
export const getExistingAuthors = async (): Promise<ExistingAuthors> => {
  try {
    const { data } = await getClient().query<GQL_ExistingAuthorsQuery>({
      query: EXISTING_AUTHORS,
    })

    const authorNames = data.authorList
      .map((author) => author.name)
      .sort((authorA, authorB) => authorA.localeCompare(authorB))

    return new Set(authorNames)
  } catch {
    return new Set()
  }
}
