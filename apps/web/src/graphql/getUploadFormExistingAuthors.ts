import { gql } from '@apollo/client'
import { type GQL_UploadFormExistingAuthorsQuery } from '@repo/graphql-types'

import { getClient } from './ApolloClient'

const UPLOAD_FORM_EXISTING_AUTHORS = gql`
  query UploadFormExistingAuthors {
    authorList {
      name
    }
  }
`
export const getUploadFormExistingAuthors = async () => {
  try {
    const { data } =
      await getClient().query<GQL_UploadFormExistingAuthorsQuery>({
        query: UPLOAD_FORM_EXISTING_AUTHORS,
      })

    const authorNames = data.authorList.map((author) => author.name)

    return new Set(authorNames)
  } catch {
    return new Set() as Set<string>
  }
}
