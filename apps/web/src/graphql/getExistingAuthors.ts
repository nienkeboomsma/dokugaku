import { gql } from '@apollo/client'
import { type GQL_ExistingAuthorsQuery } from '@repo/graphql-types'

import { getClient } from './ApolloClient'
import { ExistingAuthors } from '../types/ExistingAuthors'

const EXISTING_AUTHORS = gql`
  query ExistingAuthors {
    authorList {
      name
    }
  }
`
export const getExistingAuthors = async (): Promise<ExistingAuthors> => {
  try {
    const { data } = await getClient().query<GQL_ExistingAuthorsQuery>({
      query: EXISTING_AUTHORS,
    })

    const authorNames = data.authorList.map((author) => author.name)

    return new Set(authorNames)
  } catch {
    return new Set()
  }
}
