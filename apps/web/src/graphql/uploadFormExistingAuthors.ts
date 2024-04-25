import { gql } from '@apollo/client'
import { type GQL_UploadFormExistingAuthorsQuery } from '@repo/graphql-types'

import { getClient } from './ApolloClient'

export const UPLOAD_FORM_EXISTING_AUTHORS = gql`
  query UploadFormExistingAuthors {
    authorList {
      name
    }
  }
`
export const getUploadFormExistingAuthors = async () => {
  const { data } = await getClient().query<GQL_UploadFormExistingAuthorsQuery>({
    query: UPLOAD_FORM_EXISTING_AUTHORS,
  })

  return data.authorList.map((author) => author.name)
}
